import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ObfuscationService {
    private name: string = 'maxwellmattryan';
    private domain: string = 'gmail';
    private extension: string = 'com';

    private funkyChar: string = '-_-';

    constructor() { }

    constructEmail(): string {
        return this.constructEmailWith(this.name, this.domain, this.extension);
    }

    handleEmailClick(event: Event = undefined): void {
        this.handleEmailClickWith(event, this.name, this.domain, this.extension);
    }

    constructEmailWith(name: string, domain: string, extension: string = 'com'): string {
        return `${this.uglify(name)}${this.funkyChar}at${this.funkyChar}${this.uglify(domain)}${this.funkyChar}dot${this.funkyChar}${extension}`;
    }

    handleEmailClickWith(event: Event = undefined, name: string, domain: string, extension: string = 'com'): void {
        window.location.href = `mailto:${name}@${domain}.${extension}`;
    }

    private uglify(s: string): string {
        const idx = Math.floor(Math.random() * s.length);
        return s.slice(0, idx) + this.funkyChar + s.slice(idx, s.length);
    }
}
