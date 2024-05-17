import './style.css';

export default function AboutFeature({data}) {
    return (
        <section className="about-feature base-layout">
            <h2>{data.name}</h2>
            <p>{data.description}</p>
        </section>
    )
}