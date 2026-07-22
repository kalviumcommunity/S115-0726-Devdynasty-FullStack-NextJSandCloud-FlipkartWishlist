import { NextResponse } from "next/server";

export function success(data, status = 200) {
  return NextResponse.json(data, { status });
}

export function badRequest(message = "Invalid request.", errors) {
  return NextResponse.json({ message, ...(errors ? { errors } : {}) }, { status: 400 });
}

export function unauthorized(message = "Authentication required.") {
  return NextResponse.json({ message }, { status: 401 });
}

export function forbidden(message = "You do not have permission to perform this action.") {
  return NextResponse.json({ message }, { status: 403 });
}

export function notFound(message = "Resource not found.") {
  return NextResponse.json({ message }, { status: 404 });
}

export function serverError() {
  return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
}
