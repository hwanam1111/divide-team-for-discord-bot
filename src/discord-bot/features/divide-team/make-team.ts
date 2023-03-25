export function makeTeam(members: string[], eachTeamMembers: number) {
  const generateRandomMemberKey = () => Math.floor(Math.random() * 1000);
  const membersWithKey = members.map((member) => ({
    name: member,
    key: generateRandomMemberKey(),
  }));

  const sortResult = membersWithKey.sort((a, b) => {
    return a.key >= b.key ? 1 : -1;
  });

  const membersWithoutKey = sortResult.map((res) => res.name);

  const teamResult = [];

  for (let i = 0; i < members.length; i++) {
    const piece = [...membersWithoutKey].slice(i, i + eachTeamMembers);
    teamResult.push(piece);

    i += eachTeamMembers - 1;
  }

  return teamResult;
}
