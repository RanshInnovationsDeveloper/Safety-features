// function dtermine place kab dali
// permanent createdAt =-1 and else expiration time is some positive number
// when you are using map for places
{calculateSecondsSinceCreation(place.createdAt)} seconds ago

const calculateSecondsSinceCreation = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const differenceInSeconds = (now - created) / 1000;
    return Math.floor(differenceInSeconds);
  };



