const cacheTtl = 5 * 60 * 1000; // 5 minutes

function getWithCache(url) {
  let lastAccessed = Date.now();
  let cached = null;

  return async () => {
    const now = Date.now();

    if (cached && now - lastAccessed < cacheTtl) {
      return cached;
    }

    try {
      const fetch = (await import('node-fetch')).default;
      const response = await fetch(url);

      if (!response.ok) {
        console.log(`Response status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error.message);
    }
  };
}

const getUserProfiles = getWithCache(
  'https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json'
);
const getUsers = getWithCache(
  'https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json'
);

async function getUserProfile(username) {
  const user = await getUsers().then(users =>
    users.find(u => u.username === username)
  );

  if (!user?.uid) {
    return null;
  }

  const profile = await getUserProfiles().then(profiles =>
    profiles.find(p => p.userUid === user.uid)
  );

  return profile || null;
}

function isLessThan10YearsOld(birthdate) {
  // Non-ISO format YYYY/DD/MM, so need to manually parse
  const [year, day, month] = birthdate.split('/').map(Number);
  const date = new Date(year, month - 1, day);

  const now = new Date();
  const tenYearsAgo = new Date(
    now.getFullYear() - 10,
    now.getMonth(),
    now.getDate()
  );

  return date > tenYearsAgo;
}

module.exports = { getUserProfile, isLessThan10YearsOld };
