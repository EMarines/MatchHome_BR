export const GET = async() => {
    const markup = "<html><body><h1>MatchHome</h1></body></html>";

    return new Response(markup, {
        headers: {
            "Content-Type": "text/html",
        },
    });
};