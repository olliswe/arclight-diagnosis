import { ScreenerCommentData, DoctorCommentData } from "./types";

export const orderComments = (
  doctorComments: DoctorCommentData[],
  screenerComments: ScreenerCommentData[]
) => {
  let result = [];

  let doctorCommentsAnnotated: DoctorCommentData[] = doctorComments.map(
    (comment) => ({
      ...comment,
      type: "doctor",
    })
  );
  let screenerCommentsAnnotated: ScreenerCommentData[] = screenerComments.map(
    (comment) => ({
      ...comment,
      type: "screener",
    })
  );

  result.push(...doctorCommentsAnnotated);
  result.push(...screenerCommentsAnnotated);

  const sortedResult = result.sort((a, b) => {
    let aDate: Date = new Date(a.date_added);
    let bDate: Date = new Date(b.date_added);
    return bDate.getTime() - aDate.getTime();
  });

  return sortedResult;
};
