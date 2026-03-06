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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const create_crud_controller_utils_1 = require("utils/create-crud.controller.utils");
const post_service_1 = require("./post.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const log_request_1_interceptor_1 = require("./interceptors/log-request-1/log-request-1.interceptor");
const log_request_2_interceptor_1 = require("./interceptors/log-request-2/log-request-2.interceptor");
const log_request_1_guard_1 = require("./guards/log-request-1/log-request-1.guard");
const create_post_update_dto_1 = require("./dto/create-post-update.dto");
const log_request_2_guard_1 = require("./guards/log-request-1/log-request-2.guard");
const PostControllerBase = (0, create_crud_controller_utils_1.createCrudController)({
    create: {
        dto: create_post_dto_1.CreatePostDto,
        interceptors: [log_request_1_interceptor_1.LogRequest1Interceptor, log_request_2_interceptor_1.LogRequest2Interceptor],
    },
    update: {
        dto: update_post_dto_1.UpdatePostDto,
    },
    getAll: {
        guards: [log_request_1_guard_1.LogRequest1Guard, log_request_2_guard_1.LogRequest2Guard],
        interceptors: [log_request_1_interceptor_1.LogRequest1Interceptor, log_request_2_interceptor_1.LogRequest2Interceptor],
    },
});
let PostController = class PostController extends PostControllerBase {
    service;
    constructor(service) {
        super(service);
        this.service = service;
    }
    findAll() {
        return this.service.findAllUpdate();
    }
    create(dto) {
        return this.service.createOneUpdate(dto);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_update_dto_1.CreatePostUpdated]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "create", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map