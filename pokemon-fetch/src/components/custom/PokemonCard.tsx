import { Badge } from "../ui/badge";

const PokemonCard = ({ pokemon }) => {
    const { name, imgUrl, types, id } = pokemon;

    const typeColors = {
        grass: "#78C850",
        poison: "#A040A0",
        fire: "#F08030",
        water: "#6890F0",
        bug: "#A8B820",
        normal: "#A8A878",
        electric: "#F8D030",
        ground: "#E0C068",
        fairy: "#EE99AC",
        fighting: "#C03028",
        psychic: "#F85888",
        rock: "#B8A038",
        ghost: "#705898",
        ice: "#98D8D8",
        dragon: "#7038F8",
        dark: "#705848",
        steel: "#B8B8D0",
        flying: "#A890F0",
    }

    return (
        <div
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                margin: '10px',
                width: '150px',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
            }}
        >
            <img
                src={imgUrl}
                alt={name}
                style={{ width: '100px', height: '100px', alignSelf: 'center' }}
            />
            <h3>{name}</h3>
            <p>ID: {id}</p>
            <div>
                {types.map((type, index) => (
                    <Badge
                        style={{
                            backgroundColor: typeColors[type.type.name] || '#ccc',}}
                    >
                        {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                    </Badge>
                ))}
            </div>
        </div>
    );
}

export default PokemonCard;