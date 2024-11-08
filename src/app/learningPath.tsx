import { Book, CheckCircle, Film, Flower, Lock, Music, Star, Users } from "lucide-react";

export const LearningPath = () => {
    const levels = [
        {
            id: 1,
            key: "word-sprout",
            name: "Word Sprout",
            icon: <Flower className="w-8 h-8" />,
            description: "Plant the seeds of basic vocabulary",
            unlocked: true,
            completed: true
        },
        {
            id: 2,
            key: "phrase-garden",
            name: "Phrase Garden",
            icon: <Book className="w-8 h-8" />,
            description: "Grow your first sentences",
            unlocked: false,
            completed: false
        },
        {
            id: 3,
            key: "melody-meadow",
            name: "Melody Meadow",
            icon: <Music className="w-8 h-8" />,
            description: "Learn through Spanish songs",
            unlocked: false,
            completed: false
        },
        {
            id: 4,
            key: "culture-canyon",
            name: "Culture Canyon",
            icon: <Film className="w-8 h-8" />,
            description: "Explore through movies and shows",
            unlocked: false,
            completed: false
        },
        {
            id: 5,
            key: "social-summit",
            name: "Social Summit",
            icon: <Users className="w-8 h-8" />,
            description: "Master conversations",
            unlocked: false,
            completed: false
        },
        {
            id: 6,
            key: "fluency-peak",
            name: "Fluency Peak",
            icon: <Star className="w-8 h-8" />,
            description: "Achieve native-like fluency",
            unlocked: false,
            completed: false
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {levels.map((level) => (
                <div
                    key={level.key}
                    className={`p-6 rounded-lg shadow ${level.unlocked ? 'bg-white' : 'bg-gray-100'}`}
                >
                    {level.unlocked ? (
                        <a href={`/learning-path/${level.key}`} className="block">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-orange-100">
                                    {level.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold">{level.name}</h3>
                                        {level.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                                    </div>
                                    <p className="text-sm text-gray-600">{level.description}</p>
                                </div>
                            </div>
                        </a>
                    ) : (
                        <div className="block opacity-50 cursor-not-allowed">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-gray-200">
                                    {level.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold">{level.name}</h3>
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <p className="text-sm text-gray-600">{level.description}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};