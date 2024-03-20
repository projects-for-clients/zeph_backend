import { Injectable, Logger, NestMiddleware, Scope } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { UserRequestService } from "src/services/userRequest.service";
import { JwtPayload } from "types/types";

@Injectable({ scope: Scope.REQUEST })
export class AuthMiddleware implements NestMiddleware {
	private logger = new Logger(AuthMiddleware.name);

	constructor(
		private jwt: JwtService,
		private userRequest: UserRequestService,
	) {}

	use(req: Request, res: Response, next: () => void) {
		this.logger.log(AuthMiddleware.name);

		const { baseUrl } = req;

		const urlWithoutVersion = baseUrl.replace(/\/v\d+/, "");

		if (
			urlWithoutVersion.startsWith("/auth") ||
			urlWithoutVersion.includes("swagger")
		) {
			return next();
		}

		//authorized
		const cookie = req.cookies["api-auth"];

		if (!cookie) {
			return res.status(401).json({ message: "Forbidden Cookie Exception" });
		}

		//decrypt jwt
		const jwt: JwtPayload = this.jwt.verify(cookie, {
			secret: process.env.JWT_SECRET,
		});

		if (!jwt) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const { userId, email, role } = jwt;

		this.userRequest.setUser({
			userId,
			email,
			role,
		});

		req.user = {
			id: jwt.userId,
			email: jwt.email,
			role: jwt.role,
		};

		next();
	}
}
