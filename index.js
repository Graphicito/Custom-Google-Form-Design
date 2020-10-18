const { getShortAnswers,getParagraphs,getMultipleChoice,getDropDown,getCheckBoxes,getLinearScale } = require('./src/extractData.js');
const _ = require('lodash');
const axios = require('axios');

const getHtml = async (formUrl) => {
    return await axios.get(formUrl).then(rsp => rsp.data);
}

const extractFbPublicLoadData = (html) => {
    let data = html.split('FB_PUBLIC_LOAD_DATA_ = ')[1];
    data = data.substring(0, data.indexOf(';'));

    return JSON.parse(data);
}

const getBasicData = (fBData, form) => {
    // Title 
    const formTitle = fBData[3] || '';

    //Form description
    const formDescription = form[0] || '';

    return {
        formTitle,
        formDescription,
    }
};

const getByCategory = async (formUrl) => {
    const html = await getHtml(formUrl);
    const fBData = extractFbPublicLoadData(html);

    // Extract form that stores description and questions
    const form = fBData[1] || null;

    const { formTitle, formDescription } = getBasicData(fBData, form);

    //Form questions
    const formQuestions = form[1] || null;

    //Extract all form data
    let shortAnswers = getShortAnswers(formQuestions);
    let paragraphs = getParagraphs(formQuestions);
    let multipleChoice = getMultipleChoice(formQuestions);
    let dropDown = getDropDown(formQuestions);
    let checkBoxes = getCheckBoxes(formQuestions);
    let linearScale = getLinearScale(formQuestions);

    return {
        formAction: `https://docs.google.com/forms/u/0/d/${fBData[14]}/formResponse`,
        formTitle,
        formDescription,
        answers: {
            shortAnswers,
            paragraphs,
            multipleChoice,
            dropDown,
            checkBoxes,
            linearScale,
        }
    }
};

const get = async (formUrl) => {
    const html = await getHtml(formUrl);
    const fBData = extractFbPublicLoadData(html);

    // Extract form that stores description and questions
    const form = fBData[1] || null;

    const { formTitle, formDescription } = getBasicData(fBData, form);

    //Form questions
    const formQuestions = form[1] || null;
    
    let extractedQuestions = [];

    formQuestions.forEach(q => {
        switch(q[3]){
            case 0: extractedQuestions.push(getShortAnswers(formQuestions)); break;
            case 1: extractedQuestions.push(getParagraphs(formQuestions)); break;
            case 2: extractedQuestions.push(getMultipleChoice(formQuestions)); break;
            case 3: extractedQuestions.push(getDropDown(formQuestions)); break;
            case 4: extractedQuestions.push(getCheckBoxes(formQuestions)); break;
            case 5: extractedQuestions.push(getLinearScale(formQuestions)); break;
            default: break;
        }
    })

    //Hacky way below to get unique entries without writing separate functions
    extractedQuestions = _.flatten(extractedQuestions);

    //Obtain unique entries
    let allEntries = new Set(extractedQuestions.map(i => i.entry));

    //Convert back to array for mapping
    allEntries = [...allEntries]

    extractedQuestions = allEntries.map(i => {
        const found = extractedQuestions.find(q => q.entry === i);

        return {...found}
    })

    return extractedQuestions;
}

module.exports = {
    get,
    getBasicData,
    getByCategory
}