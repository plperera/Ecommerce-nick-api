export function acceptedError( message: string ) {
    return {
      name: "AcceptedError",
      message: message || "",
    };
  }
  