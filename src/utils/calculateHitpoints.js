const calculateHitpoints = (fleet) => {
  let hitpoints = 0;
  fleet.forEach((ship) => {
    hitpoints += ship.hitpoints;
  });
  return hitpoints;
};

export default calculateHitpoints;
