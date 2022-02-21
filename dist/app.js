var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from './util.js';
import ProjectList from './ProjectList.js';
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
        this.attach();
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
            this.clearInput();
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    validate(option) {
        let isValid = true;
        if (option.required) {
            isValid = isValid && option.value.toString().trim().length > 0;
        }
        if (option.minLength && typeof option.value === 'string') {
            isValid = isValid && option.value.trim().length >= option.minLength;
        }
        if (option.maxLength && typeof option.value === 'string') {
            isValid = isValid && option.value.trim().length <= option.maxLength;
        }
        if (option.min != null && typeof option.value === 'number') {
            isValid = isValid && option.value >= option.min;
        }
        if (option.max != null && typeof option.value === 'number') {
            isValid = isValid && option.value <= option.max;
        }
        return isValid;
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = Number(this.peopleInputElement.value);
        const titleValidateable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidateable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
            maxLength: 100
        };
        const peopleValidateable = {
            value: Number(enteredPeople),
            required: true,
            min: 1,
            max: 5
        };
        if (!this.validate(titleValidateable) || !this.validate(descriptionValidateable) || !this.validate(peopleValidateable)) {
            alert('invalid input');
            return;
        }
        return [enteredTitle, enteredDescription, enteredPeople];
    }
    clearInput() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const ProjInput = new ProjectInput();
const activeProjList = new ProjectList('active');
const finshedProjList = new ProjectList('finished');
console.log(ProjInput, activeProjList, finshedProjList);
//# sourceMappingURL=app.js.map