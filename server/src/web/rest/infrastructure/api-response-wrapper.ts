import { Property } from "@tsed/schema";

class ApiResponse<T> {
    @Property()
    success: boolean;

    @Property()
    message: string;

    @Property()
    data: T;

    constructor(success: boolean, message: string, data: T) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success<T>(data: T, message: string = 'Operation successful'): ApiResponse<T> {
        return new ApiResponse(true, message, data);
    }

    static failure<T>(message: string, data: T): ApiResponse<T> {
        return new ApiResponse(false, message, data);
    }
}

export { ApiResponse };