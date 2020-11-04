# Google Form Customizer
### Beautify and customize your Google Form with custom HTML and CSS.
<br>

## Update 4/11/2020:
#### Added placeholder attribute to the shortanswer paragraph, and dropdown objects. Used for model data binding in custom form if user wishes to add placeholder (which does not exist in Google Form).
<br>

<!-- ![alt-text-1](./examples/sample_vuetify_gform.png) ![alt-text-2](./examples/sample_custom_vuetify_form.png "title-2") -->
<img src="./examples/sample_vuetify_gform.png" alt="graphicito custom google form" width="250"/><img src="./examples/sample_custom_vuetify_form.png" alt="graphicito custom google form" width="250"/>
</br>
Original Google Form (left) vs Customized Google Form (right)

___

### Install the package
`npm i custom-gform`

Run `npm install` to install all dependencies only if you are cloning the project.

___
### API
| API  | Description | Params|
| ---- | ----------- | ------|
| get | Retrieve all form data in the same order listed | none
| getBasicData | Returns the form title and description | none
| getByCategory | Retrieve all form data and categorize the questions into its own category (short answers, multiple choice...) | none
vueSubmitForm | Submit form on Vue app with one line of code |(gFormData, formData) 

___

### Supported Question Types
   
    0: Short answers
    1: Paragraph
    2: Multiple Choice
    3: Drop Down
    4: Checkboxes  
    5: Linear Scale

___

### Example .get Output

```js
    // Works with both edit and preview link
    const formData = await get("Replace with your Google Form link");

    {
        formTitle: 'Custom G Form',
        formDescription: 'Form Description',
        questions: [ 
            { 
                entry: 'entry.159023240',
                type: 'multiple-choice',
                title: 'Multiple choice',
                description: 'MC Description',
                choices: [ [Object], [Object], [Object] ],
                required: false 
            },
            { 
                entry: 'entry.1862994755',
                title: 'Multiple choice',
                type: 'multiple-choice',
                description: 'MC Description REQUIRED',
                choices: [ [Object], [Object] ],
                required: true },
            { 
                entry: 'entry.1536591222',
                title: 'Short Answer',
                type: 'short-answer',
                description: 'Description: REQUIRED',
                required: true 
            }
        ]
    }
```

### Example .getByCategory Output

```js
    // Works with both edit and preview link
    const formData = await getByCategory("Replace with your Google Form link");
    { 
        formAction: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeHM3lr79IGiu57NR6lwUMqBZDKsp9C5IpzRApgLfdZX2gwkw/formResponse',
        formTitle: 'Custom G Form',
        formDescription: 'Form Description',
        questions: { 
            shortAnswers: [ [Object], [Object] ],
            paragraphs: [ [Object], [Object] ],
            multipleChoice: [ [Object], [Object] ],
            dropDown: [ [Object] ],
            checkBoxes: [ [Object], [Object] ],
            linearScale: [ [Object] ] 
        } 
    }
```
___
### Return Object Info
| Key  | Description |
| ---- | ----------- |
| formAction | POST api to submit the form response
| entry | Use this in the `name` attribute of each form input 
| required | Check for required form field
___

### *NEW*: Submit forms with one line of code (VUE ONLY)

Always validate your form and don't submit empty forms. Remember to import the api as well.

```js
    import { vueSubmitForm } from 'custom-gform';
```
```js
    methods: {
        /*
            Retrieve this.gFormData with the .get api and pass it to the first param
            Pass all v-model formData into the second param
            Check code in the next section to learn how to dynamically assign v-models for your form
        */
       
        async submitForm() {
            // Returns a promise with {code: success/fail}!
            await vueSubmitForm(this.gFormData, this.formData);
        },
    }
```
Dynamically assigns v-model (view example in examples/vue-bootstrap.vue for more info)
```js
    mounted(){
        const dynamicVModel = this.gFormData.questions.map((i) => i.title);

        dynamicVModel.forEach((i) => {
            this.$set(this.formData, i, null);
        });
    }
```
___

### Vue + Bootstrap Example
Check out the `examples/vue-bootstrap.vue` folder in GitHub for example usage
___
### Credits
Custom GForm is created and maintained by [Graphicito](http://graphicito.com). For custom web development solution or Google Form customization, contact us at [Contact Graphicito](http://graphicito.com/contact).

___
### Changelog
```
    4/11/2020: Added placeholder attribute to the shortanswer paragraph, and dropdown objects. Used for model data binding in custom form if user wishes to add placeholder (which does not exist in Google Form).
    
    3/11/2020: Added easy vue form submit without importing axios and name attribute dependency.
```