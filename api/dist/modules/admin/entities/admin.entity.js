"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const entity_service_1 = require("../../../core/database/entity.service");
let Admin = class Admin {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'varchar', length: 6 }),
    __metadata("design:type", Object)
], Admin.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], Admin.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 255, nullable: false }),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], Admin.prototype, "password", void 0);
Admin = __decorate([
    typeorm_1.Entity('admin'),
    __metadata("design:paramtypes", [Object])
], Admin);
exports.Admin = Admin;
//# sourceMappingURL=admin.entity.js.map