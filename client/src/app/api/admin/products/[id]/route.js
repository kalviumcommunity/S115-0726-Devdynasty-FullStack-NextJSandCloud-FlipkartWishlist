import { verifyAdmin } from "@/lib/auth";
import { badRequest, forbidden, notFound, serverError, success, unauthorized } from "@/lib/apiResponse";
import prisma from "@/lib/prisma";
import { validateProductUpdate } from "@/lib/validators/productValidator";

async function requireAdmin(request) {
  const result = await verifyAdmin(request);
  if (!result.user) {
    return result.reason === "forbidden" ? forbidden() : unauthorized();
  }
  return null;
}

async function getProductId(params) {
  const { id: paramId } = await params;
  const id = Number(paramId);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(request, { params }) {
  try {
    const authError = await requireAdmin(request);
    if (authError) return authError;

    const id = await getProductId(params);
    if (!id) return badRequest("Invalid product id.");

    const product = await prisma.product.findUnique({ where: { id } });
    return product ? success(product) : notFound("Product not found.");
  } catch (error) {
    console.error("Admin product fetch failed", error);
    return serverError();
  }
}

export async function PUT(request, { params }) {
  try {
    const authError = await requireAdmin(request);
    if (authError) return authError;

    const id = await getProductId(params);
    if (!id) return badRequest("Invalid product id.");

    const validation = validateProductUpdate(await request.json());
    if (!validation.success) return badRequest("Invalid product data.", validation.errors);

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) return notFound("Product not found.");

    const product = await prisma.product.update({
      where: { id },
      data: validation.value,
    });

    return success(product);
  } catch (error) {
    console.error("Admin product update failed", error);
    return serverError();
  }
}

export async function PATCH(request, context) {
  return PUT(request, context);
}

export async function DELETE(request, { params }) {
  try {
    const authError = await requireAdmin(request);
    if (authError) return authError;

    const id = await getProductId(params);
    if (!id) return badRequest("Invalid product id.");

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) return notFound("Product not found.");

    await prisma.product.delete({ where: { id } });
    return success({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Admin product delete failed", error);
    return serverError();
  }
}
