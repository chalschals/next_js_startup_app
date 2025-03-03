import markdownit from "markdown-it";

const md = markdownit();

const SafeMarkdown = ({ content }: { content: string }) => {

    const sanitizedHTML = md.render(content || "");

    return (
        <>
            {
                sanitizedHTML
                    ? <div className="prose max-w-4xl font-work-sans break-all" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
                    : <p className="no-result">No details provided</p>
            }
        </>
    )
};

export default SafeMarkdown;
