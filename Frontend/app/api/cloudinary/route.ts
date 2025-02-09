import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData(); // Use req.formData() instead of req.json()
    const file = formData.get("file");
    console.log(file);
    return NextResponse.json({file});
    // if (!images || images.length === 0) {
    //   return NextResponse.json({ error: "No images provided" }, { status: 400 });
    // }

    // const uploadPromises = images.map((image:string) =>
    //   cloudinary.uploader.upload(image, { folder: "nextjs_uploads" })
    // );

    // const uploadResults = await Promise.all(uploadPromises);
    // const imageUrls = uploadResults.map((upload) => upload.secure_url);

    // return NextResponse.json({ urls: imageUrls });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
