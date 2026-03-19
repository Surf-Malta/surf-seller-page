export const fade = {
    hidden: { opacity: 0, y: 16 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            delay: i * 0.07,
            ease: [0.25, 0.1, 0.25, 1] as any
        },
    }),
};

export const stagger = {
    visible: {
        transition: {
            staggerChildren: 0.07,
        },
    },
};