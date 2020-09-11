export class Email {
  name: string;
  subject: string;
  text: string;

  constructor(name: string, subject: string, text: string) {
    this.name = name;
    this.subject = subject;
    this.text = text;
  }
}
