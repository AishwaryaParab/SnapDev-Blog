import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";

// GET ALL COMMENTS -> http://localhost:3000/api/comments?post=2
export const GET = async (req) => {
    const {searchParams} = new URL(req.url);
    const postSlug = searchParams.get("post");

    try {
        const comments = await prisma.comment.findMany({
            where: {...(postSlug && {postSlug: postSlug})},
            include: {user: true}
        })
        return new NextResponse(JSON.stringify(comments, {status: 200}));
    } catch(err) {
        console.log(err);
        return new NextResponse(JSON.stringify({message: "Something went wrong!"}, {status: 500}));
    }
}

// CREATE A COMMENT -> http://localhost:3000/api/comments
export const POST = async (req) => {
    const session = await getAuthSession();

    // Not authenticated
    if(!session) {
        return new NextResponse(JSON.stringify({message: "Not authenticated!"}, {status: 401}));
    }

    try {
        const body = await req.json();
        const comment = await prisma.comment.create({
            data: {...body, userEmail: session.user.email} // all of this is done in the backend (server-side)
        })
        return new NextResponse(JSON.stringify(comment, {status: 200}));
    } catch(err) {
        console.log(err);
        return new NextResponse(JSON.stringify({message: "Something went wrong!"}, {status: 500}));
    }
}