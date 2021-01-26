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

      ROLES.forEach((role) => {
        const playersWithRole = innerPlayers.filter(
          (player) => player.roles[role] && !player.pick
        );
        if (playersWithRole.length <= 0) return;
        playersWithRole[random(playersWithRole.length - 1)].pick = role;
      });

      setPlayers(innerPlayers);
    },
    [setPlayers]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      roll(fromEvent(e).players);
    },
    [roll]
  );

  const submitBtn = useRef(null);
  const forceSubmit = useCallback(() => {
    if (!submitBtn.current) return;
    submitBtn.current.click();
  }, []);

  return (
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
  );
}

export default App;
