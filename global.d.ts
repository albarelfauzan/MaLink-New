// global.d.ts
interface Window {
  ethereum?: {
      request: (args: { method: string }) => Promise<any>;
      on: (event: string, callback: (data: any) => void) => void;
      removeListener: (event: string, callback: (data: any) => void) => void; // Tambahkan ini
  };
}