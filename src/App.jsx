import { useCallback, useRef } from "react";
import { useLocalStorage } from "react-use";
import { random } from "lodash";
import { fromEvent } from "from-form-submit";

const ROLES = ["top", "jungle", "mid", "adc", "support"];

const getRoleValue = (roles, role) => {
  if (!roles) return true;
  if (roles[role] === null || roles[role] === undefined) return true;
  return roles[role];
};

const Player = ({ name, roles, pick, formPrefix, onRoleChange }) => {
  return (
    <tr>
      <td>
        <input name={`${formPrefix}name`} defaultValue={name} />
      </td>
      {ROLES.map((role) => (
        <td key={role}>
          <input
            type="checkbox"
            name={`${formPrefix}roles.${role}`}
            defaultChecked={getRoleValue(roles, role)}
            onChange={onRoleChange}
          />
        </td>
      ))}
      <td>{pick}</td>
    </tr>
  );
};

function App() {
  const [players = [], setPlayers] = useLocalStorage("players");

  const roll = useCallback(
    (players) => {
      const innerPlayers = players.map((player) => ({
        ...player,
        pick: undefined,
      }));

      // sort roles from the least popular to the most
      const getAvailablePlayersForRole = (role) =>
        innerPlayers.filter((player) => player.roles[role] && !player.pick);
      const sortRoles = (a, b) =>
        getAvailablePlayersForRole(a).length -
        getAvailablePlayersForRole(b).length;
      let sortedRoles = ROLES.slice().sort(sortRoles);

      while (sortedRoles.length > 0) {
        const role = sortedRoles[0];

        // choose a player for this role a pick role
        const playersAgreedRole = innerPlayers.filter(
          (player) => player.roles[role] && !player.pick
        );
        if (playersAgreedRole.length > 0) {
          const rIndex = random(playersAgreedRole.length - 1);
          const pickedPlayer = playersAgreedRole[rIndex];

          pickedPlayer.pick = role;
        }

        // sort roles once again since some players are not available now
        sortedRoles = sortedRoles.slice(1).sort(sortRoles);
      }

      setPlayers(innerPlayers);
    },
    [setPlayers]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const data = fromEvent(e);

      roll(data.players);
    },
    [roll]
  );

  const submitBtn = useRef(null);
  const forceSubmit = useCallback(() => {
    if (!submitBtn.current) return;
    submitBtn.current.click();
  }, []);

  return (
    <div>
      <a href="https://github.com/fabienjuif/lol-pick">Source code</a>

      <form onSubmit={onSubmit}>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              {ROLES.map((role) => (
                <th key={role}>{role}</th>
              ))}
              <th>Pick</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <Player
                key={index}
                {...players[index]}
                formPrefix={`players.${index}.`}
                onRoleChange={forceSubmit}
              />
            ))}
          </tbody>
        </table>
        <button type="submit" ref={submitBtn}>
          roll
        </button>
      </form>
    </div>
  );
}

export default App;
