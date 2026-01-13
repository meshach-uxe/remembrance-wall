import { ImageData } from "@/components/ui/sphere-grid";

export const BASE_IMAGES = [
    {
        src: "https://images.unsplash.com/photo-1590053163982-f5c7130eb5bc?q=80&w=600&auto=format&fit=crop",
        alt: "The Cotton Tree",
        title: "Historic Cotton Tree",
        desc: "A symbol of freedom and resilience in the heart of Freetown."
    },
    {
        src: "https://images.unsplash.com/photo-1463171379577-089f32f83a2e?q=80&w=600&auto=format&fit=crop",
        alt: "Peace Monument",
        title: "Peace & Cultural Monument",
        desc: "Honoring the victims and celebrating our lasting peace."
    },
    {
        src: "https://images.unsplash.com/photo-1623838641970-d790f4234556?q=80&w=600&auto=format&fit=crop",
        alt: "White Ribbon",
        title: "Jan 18 - Remembrance Day",
        desc: "We pause to remember the end of the war in 2002."
    },
    {
        src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=600&auto=format&fit=crop",
        alt: "Children of Sierra Leone",
        title: "The Next Generation",
        desc: "Teaching values of peace to ensure violence never returns."
    },
    {
        src: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=600&auto=format&fit=crop",
        alt: "Candle Light",
        title: "Lest We Forget",
        desc: "Honoring the memory of the lives lost."
    },
    {
        src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop",
        alt: "Nature Harmony",
        title: "Nature's Peace",
        desc: "Finding solace in the beauty of our land."
    },
    {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop",
        alt: "Unity Landscape",
        title: "United We Stand",
        desc: "Together building a better future."
    },
    {
        src: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=600&auto=format&fit=crop",
        alt: "Green Growth",
        title: "Growth & Renewal",
        desc: "New beginnings for our communities."
    },
    {
        src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop",
        alt: "Forest Light",
        title: "Light in Darkness",
        desc: "Hope guides us forward."
    },
    {
        src: "https://images.unsplash.com/photo-1501854140884-074bf86ee91c?q=80&w=600&auto=format&fit=crop",
        alt: "Peaceful Waters",
        title: "Calm Waters",
        desc: "Reflection and tranquility."
    },
    {
        src: "https://images.unsplash.com/photo-1576014131795-d4c6792dc840?q=80&w=600&auto=format&fit=crop",
        alt: "Justice",
        title: "Truth & Reconciliation",
        desc: "Healing our wounds through truth and forgiveness."
    },
    {
        src: "https://images.unsplash.com/photo-1501854140884-074bf86ee91c?q=80&w=600&auto=format&fit=crop",
        alt: "Peace Bridge",
        title: "The Peace Bridge",
        desc: "Transforming sites of conflict into symbols of unity."
    },
    {
        src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop",
        alt: "Landscape",
        title: "Sweet Salone",
        desc: "Protecting the beauty and peace of our land."
    },
    {
        src: "https://images.unsplash.com/photo-1628522338573-030206969566?q=80&w=600&auto=format&fit=crop",
        alt: "Community",
        title: "Unity in Diversity",
        desc: "One country, one people, standing together."
    },
    {
        src: "https://images.unsplash.com/photo-1499572459800-47b59e0a0d4c?q=80&w=600&auto=format&fit=crop",
        alt: "Hands",
        title: "Never Again",
        desc: "A solemn promise to future generations."
    }
];

export const INITIAL_MEMORIES: ImageData[] = Array.from({ length: 150 }, (_, i) => {
    if (i < BASE_IMAGES.length) {
        const base = BASE_IMAGES[i];
        return {
            id: `${i + 1}`,
            src: base.src,
            alt: base.alt,
            title: base.title,
            description: base.desc,
        };
    } else {
        // Generate unique content for the rest
        const topics = ["peace", "nature", "sky", "flower", "river", "mountain", "forest", "people", "unity", "hope"];
        const topic = topics[i % topics.length];
        return {
            id: `${i + 1}`,
            // Using loremflickr with a lock to ensure a unique image for each index
            src: `https://loremflickr.com/600/600/${topic}?lock=${i}`,
            alt: `Remembrance ${i}`,
            title: `Memory #${i + 1}`,
            description: "A shared moment of reflection and peace.",
        };
    }
});
