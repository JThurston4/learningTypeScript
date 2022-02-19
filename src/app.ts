// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }
  return adjDescriptor
}

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;


  constructor() {
    this.templateElement = document.getElementById('project-input') as HTMLTemplateElement;
    this.hostElement = document.getElementById('app') as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.attach();

  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(title, description, people);
      this.clearInput();
    }
  } 

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }



  private validate(option: Validatable) {
    let isValid = true;
    if (option.required) {
      isValid = isValid && option.value.toString().trim().length > 0;
    }

    if (option.minLength && typeof option.value === 'string') {
      isValid = isValid && option.value.trim().length >= option.minLength
    }

    if (option.maxLength && typeof option.value === 'string') {
      isValid = isValid && option.value.trim().length <= option.maxLength
    }

    if (option.min != null && typeof option.value === 'number') {
      isValid = isValid && option.value >= option.min
    }

    if (option.max != null && typeof option.value === 'number') {
      isValid = isValid && option.value <= option.max
    }
    return isValid;
  }

  private gatherUserInput():[string, string, number] | void{
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = Number(this.peopleInputElement.value);

    const titleValidateable: Validatable = {
      value: enteredTitle,
      required: true
    }

    const descriptionValidateable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
      maxLength: 100
    }

    const peopleValidateable: Validatable = {
      value: Number(enteredPeople),
      required: true,
      min: 1,
      max: 5
    }

    if (!this.validate(titleValidateable) || !this.validate(descriptionValidateable) || !this.validate(peopleValidateable)) {
      alert('invalid input')
      return;
    } 
    return [enteredTitle, enteredDescription, enteredPeople]
  }

  private clearInput() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }
 }

const ProjInput = new ProjectInput();