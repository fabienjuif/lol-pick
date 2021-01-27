import { useCallback, useRef, useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { random } from "lodash";
import { fromEvent } from "from-form-submit";

const ROLES = ["Top", "Jungle", "Mid", "Bottom", "Support"];

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

  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const clipboardTimer = useRef();

  const roll = useCallback(
    async (players) => {
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

      // copy result to clipboard
      if (clipboardTimer.current) {
        clearTimeout(clipboardTimer.current);
      }
      const roleMaxLength = ROLES.reduce((acc, role) =>
        acc > role.length ? acc : role.length
      );
      clipboardInput.current.value = ROLES.map(
        (role) =>
          `${role.padEnd(roleMaxLength, " ")}: ${
            innerPlayers.find(({ pick }) => pick === role)?.name || "n/a"
          }`
      )
        .join("\n")
        .concat("\n\nGenerated with: https://fabienjuif.github.io/lol-pick/");
      clipboardInput.current.select();
      document.execCommand("copy");
      setCopiedToClipboard(true);
      clipboardTimer.current = setTimeout(() => {
        setCopiedToClipboard(false);
      }, 500);
    },
    [setPlayers]
  );

  useEffect(() => {
    return () => {
      if (clearTimeout.current) {
        clearTimeout(clearTimeout.current);
      }
    };
  }, []);

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

  const clipboardInput = useRef(null);

  return (
    <div>
      <a href="https://github.com/fabienjuif/lol-pick">Source code</a>

      <textarea
        style={{
          opacity: 0,
          position: "absolute",
          top: 0,
          right: 0,
          pointerEvents: "none",
        }}
        ref={clipboardInput}
      />

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
        {copiedToClipboard && <p>Copied in clipboard!</p>}
      </form>
    </div>
  );
}

export default App;
