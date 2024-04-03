export const GetRating = ({ rating }) => {
  const starCount = Math.round(rating);
  const star = "⭐";

  return star.repeat(starCount);
};
