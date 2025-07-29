import ReactMarkdown from "react-markdown"
export default function Recipe(props) {
    return (
        <section className="result-all">
                <ReactMarkdown>{props.recipeshown}</ReactMarkdown> 
                <br />
            </section>
    )
}