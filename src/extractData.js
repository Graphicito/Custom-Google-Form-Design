/*
    Question types:
    
    0: Short answers
    1: Paragraph
    2: Multiple Choice
    3: Drop Down
    4: Checkboxes  
    5: Linear Scale
    7: Multiple Choice Grid, Tick Box Grid
    9: Date
    10: Time
    13: File Upload (Enabling File Upload will force user to sign in)
*/
const getShortAnswers = (formQuestions) => {
    let shortAnswers = formQuestions.filter(q => q[3] === 0);
    shortAnswers = shortAnswers.map(q => {
        return {
            type: 'short-answer',
            entry: q[0],
            title: q[1],
            description: q[2],
            required: Boolean(q[4][0][2]),
        }
    })
    
    return shortAnswers;
}

const getParagraphs = (formQuestions) => {
    let paragraphs = formQuestions.filter(q => q[3] === 1);
    paragraphs = paragraphs.map(q => {
        return {
            type: 'paragraph',
            entry: q[0],
            title: q[1],
            description: q[2],
            required: Boolean(q[4][0][2]),
        }
    })

    return paragraphs;
}

const getMultipleChoice = (formQuestions) => {
    let multipleChoice = formQuestions.filter(q => q[3] === 2);
    multipleChoice = multipleChoice.map(q => {
        let choices = q[4][0][1];

        choices = choices.map(choice => {
            if(choice[4] === 1){
                return {
                    title: 'Others'
                }
            }

            return {
                title: choice[0]
            }
        })

        return {
            type: 'multiple-choice',
            entry: q[0],
            title: q[1],
            description: q[2],
            choices,
            required: Boolean(q[4][0][2]),   
        }
    })

    return multipleChoice;
}

const getDropDown = (formQuestions) => {
    let dropDown = formQuestions.filter(q => q[3] === 3);

    dropDown = dropDown.map(q => {
        let choices = q[4][0][1];

        choices = choices.map(choice => {
            return {
                title: choice[0]
            }
        })

        return {
            type: 'dropdown',
            entry: q[0],
            title: q[1],
            description: q[2],
            choices,
            required: Boolean(q[4][0][2]),  
        }
    })

    return dropDown;
}

const getCheckBoxes = (formQuestions) => {
    let checkBoxes = formQuestions.filter(q => q[3] === 4);

    checkBoxes = checkBoxes.map(q => {
        let choices = q[4][0][1];

        choices = choices.map(choice => {
            return {
                title: choice[0]
            }
        })

        return {
            type: 'checkbox',
            entry: q[0],
            title: q[1],
            description: q[2],
            choices,
            required: Boolean(q[4][0][2]),  
        }
    })

    return checkBoxes;
}

const getLinearScale = (formQuestions) => {
    let linearScale = formQuestions.filter(q => q[3] === 5);

    linearScale = linearScale.map(q => {
        let totalChoices = q[4][0][1].length || 0;

        return {
            type: 'linear-scale',
            entry: q[0],
            title: q[1],
            description: q[2],
            minLabel: q[4][0][3][0],
            maxLabel: q[4][0][3][1],
            totalChoices,
            required: Boolean(q[4][0][2]),  
        }
    })

    return linearScale;
}

module.exports = {
    getShortAnswers,
    getParagraphs,
    getMultipleChoice,
    getDropDown,
    getCheckBoxes,
    getLinearScale,
}