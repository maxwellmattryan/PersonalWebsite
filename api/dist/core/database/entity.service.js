"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const entity_exception_1 = require("./entity.exception");
let EntityService = class EntityService {
    constructor() {
        this.digest = 'base64';
        this.hashAlgorithm = 'sha256';
        this.generateRandomIdChar = () => {
            const randChars = [
                String.fromCharCode(this.getRandomInt(26) + 65),
                String.fromCharCode(this.getRandomInt(10) + 48)
            ];
            return randChars[this.getRandomInt(randChars.length)];
        };
    }
    createEntity(entityData, uniqueProperties) {
        uniqueProperties.forEach(p => {
            if (!entityData[p])
                throw new entity_exception_1.InvalidEntityPropertyException();
        });
        const identifier = uniqueProperties.map(p => entityData[p]).join(' ');
        return Object.assign(Object.assign({}, entityData), { id: this.createStringHashId(identifier) });
    }
    createStringHashId(identifier, length = 6) {
        const now = new Date().toString();
        return crypto_1.createHash(this.hashAlgorithm)
            .update(identifier + now + this.getRandomInt(1000000))
            .digest(this.digest)
            .toString()
            .replace(/[^A-Z0-9]/g, this.generateRandomIdChar)
            .slice(0, length);
    }
    getRandomInt(n) {
        return Math.floor(Math.random() * Math.floor(n));
    }
};
EntityService = __decorate([
    common_1.Injectable()
], EntityService);
exports.EntityService = EntityService;
//# sourceMappingURL=entity.service.js.map