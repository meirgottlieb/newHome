"use strict";
class DomainException extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
    static when(isValid, message) {
        if (isValid)
            throw new DomainException(message);
    }
}
exports.DomainException = DomainException;
//# sourceMappingURL=domain.exception.js.map