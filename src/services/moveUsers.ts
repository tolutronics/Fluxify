// const reg = async () => {
//     const data = await getAllPosts();
//     onSnapshot(data, async (snapshot: any) => {
//       snapshot.docChanges().forEach(async (change: any) => {
//         if (change.type === "added") {
//           const det = change.doc.data();
//           posts.push({
//             studentNumber: det.userId,
//             createdAt: getDate(det.day, det.time),
//             photoUrl: det.photourl,
//             postText: det.text,
//           });
//         }
//         if (change.type === "modified") {
//           //
//         }
//         if (change.type === "removed") {
//           //
//         }
//       });

//       console.log(posts);

//       for (let index = 0; index < posts.length; index++) {
//         const user = await savePost(index);
//         console.log(user);
//       }
//     });
//   };

//   const getDate = (day: any, time: any) => {
//     let num = null;
//     if (day == "Monday") num = 15;
//     if (day == "Tuesday") num = 16;
//     if (day == "Wednesday") num = 17;
//     if (day == "Thursday") num = 18;
//     if (day == "Friday") num = 19;
//     if (day == "Saturday") num = 20;
//     if (day == "Sunday") num = 21;

//     const date = `2019-07-${num} ${getTime(time)}:00.000000+00`;

//     return date;
//   };

//   const getTime = (time: string) => {
//     if (time.includes("pm")) {
//       const splitted = parseInt(time.split(" ")[0].split(":")[0]);
//       const hour = `${splitted + 12}`;
//       return `${hour.padStart(2, "0")}:${time.split(" ")[0].split(":")[1]}`;
//     } else {
//       const splitted = time.split(" ")[0];
//       return splitted;
//     }
//   };

//   const sleep = (ms: any) => {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   };

//   const savePost = async (index: any) => {
//     const post = posts[index];
//     const id = await getUserId(post.studentNumber);
//     const save = await savePostToDatabase({
//       studentNumber: post.studentNumber,
//       createdAt: post.createdAt,
//       studentId: id.data[0].studentId,
//       photoUrl: post.photoUrl,
//       postText: post.postText,
//     });
//     return await sleep(2000).then((v) => save);
//   };
