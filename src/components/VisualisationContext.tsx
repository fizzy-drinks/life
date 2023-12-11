import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

const VisualisationContext = createContext<{
  color: string;
  setColor: (val: string) => void;
  center: [number, number];
  moveCenter: (delta: [number, number]) => void;
}>({} as unknown as any);

const VisualisationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [color, setColor] = useState<string>('#ef4444');
  const [center, setCenter] = useState<[number, number]>([0, 0]);

  const moveCenter = ([x, y]: [number, number]) => {
    setCenter((prev) => [prev[0] - x, prev[1] - y]);
  };

  return (
    <VisualisationContext.Provider
      value={{ color, setColor, center, moveCenter }}
    >
      {children}
    </VisualisationContext.Provider>
  );
};

export default VisualisationProvider;

export const useVisualisation = () => useContext(VisualisationContext);
