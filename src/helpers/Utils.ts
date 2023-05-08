export const calculateSize = (
    content: string,
    bottomLimit: number,
    topLimit: number
) => {
    const size = content.length * 3;
    if (size < bottomLimit) {
        return bottomLimit;
    } else if (size < topLimit) {
        return size;
    } else {
        return topLimit;
    }
}