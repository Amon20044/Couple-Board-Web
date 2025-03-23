type MediaItem = {
    id: string;
    album_id: string;
    media_url: string;
    media_type: string;
    uploaded_at: string;
  };
  
  type GroupedMedia = {
    [key: string]: MediaItem[];
  };
  
  const groupMediaByMonthYear = (media: MediaItem[]): GroupedMedia => {
    const grouped: GroupedMedia = media.reduce((acc: GroupedMedia, item: MediaItem) => {
      const date = new Date(item.uploaded_at);
      const monthYear = date.toLocaleString("en-US", { month: "long", year: "numeric" });
  
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(item);
      return acc;
    }, {});
  
    // Sort the grouped keys chronologically
    const sortedKeys = Object.keys(grouped).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });
  
    // Create a new sorted object
    const sortedGrouped: GroupedMedia = {};
    for (const key of sortedKeys) {
      sortedGrouped[key] = grouped[key].sort(
        (a, b) => new Date(a.uploaded_at).getTime() - new Date(b.uploaded_at).getTime()
      );
    }
  
    return sortedGrouped;
  };
  
  // Example JSON data
  const jsonData = {
    media: [
      {
        id: "c05d44ad-e51e-4636-99fc-3c8dc5ab0003",
        album_id: "1496db48-7723-48d9-8a9a-5960b9313f0e",
        media_url: "https://res.cloudinary.com/dq3oz6vom/image/upload/v1741978748/ptfefopdx9wymb7z8sbl.jpg",
        media_type: "image",
        uploaded_at: "2025-03-14T18:59:10.198771",
      },
      {
        id: "09917843-dc40-4502-b0e0-00eeab59450e",
        album_id: "1496db48-7723-48d9-8a9a-5960b9313f0e",
        media_url: "https://res.cloudinary.com/dq3oz6vom/image/upload/v1741978753/wopfgpw1on5aqnub5xkv.jpg",
        media_type: "image",
        uploaded_at: "2025-03-14T18:59:13.679532",
      },
      {
        id: "1240121e-ad09-4753-80fe-3d96ff19d6aa",
        album_id: "1496db48-7723-48d9-8a9a-5960b9313f0e",
        media_url: "https://res.cloudinary.com/dq3oz6vom/image/upload/v1741985608/tiqaut0urnhtzzg6as0b.jpg",
        media_type: "image",
        uploaded_at: "2025-09-14T20:53:29.073142",
      },
      {
        id: "999c27e5-b528-43dd-8aaf-ce9e3c69c016",
        album_id: "1496db48-7723-48d9-8a9a-5960b9313f0e",
        media_url: "https://res.cloudinary.com/dq3oz6vom/image/upload/v1741985609/cq6si4opn8dwsbyvwn31.jpg",
        media_type: "image",
        uploaded_at: "2025-03-14T20:53:30.148258",
      },
      {
        id: "2dacbb24-6f8f-4355-acad-d642ec7e1417",
        album_id: "1496db48-7723-48d9-8a9a-5960b9313f0e",
        media_url: "https://res.cloudinary.com/dq3oz6vom/image/upload/v1741985610/wcpbnlwznxx8zkcfegua.jpg",
        media_type: "image",
        uploaded_at: "2025-09-14T20:53:31.22031",
      },
      {
        id: "d2350cd5-4c7f-4df6-adb0-e91b8f548827",
        album_id: "1496db48-7723-48d9-8a9a-5960b9313f0e",
        media_url: "https://res.cloudinary.com/dq3oz6vom/image/upload/v1741985611/axb3yqvncls1aky8ljpd.jpg",
        media_type: "image",
        uploaded_at: "2025-03-14T20:53:32.429889",
      },
      {
        id: "aa3695ef-8125-463e-9b89-338ee610bea2",
        album_id: "1496db48-7723-48d9-8a9a-5960b9313f0e",
        media_url: "https://res.cloudinary.com/dq3oz6vom/image/upload/v1741985648/gdwwmxjx7uyh0kwlkzni.gif",
        media_type: "image",
        uploaded_at: "2025-01-14T20:54:10.268811",
      },
    ],
  }; // example data
  
  const groupedData = groupMediaByMonthYear(jsonData.media);
  console.log(groupedData);

  export { groupMediaByMonthYear };
  