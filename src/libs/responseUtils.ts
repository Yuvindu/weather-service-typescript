export const successResponse = (response: Record<string, unknown> | {}) => {
    return {
      statusCode: 200,
      isBase64Encoded: false,
      body: JSON.stringify(response),
    };
  };
  
  export const clientErrorResponse = (response: Record<string, unknown> | {}) => {
    return {
      statusCode: 400,
      isBase64Encoded: false,
      body: JSON.stringify(response),
    };
  };
  
  export const serverErrorResponse = (response: Record<string, unknown> | {}) => {
    return {
      statusCode: 500,
      isBase64Encoded: false,
      body: JSON.stringify(response),
    };
  };
  
  export const handleError = (error: any): { statusCode: number; body: string } => {
    console.error('Error:', error);
  
    if (error.response) {
      const errorMessage =
        (error.response.data as { message: string })?.message ||
        "An error occurred while processing the weather data.";
      return serverErrorResponse({ message: errorMessage });
    }
  
    return serverErrorResponse({ message: "An unexpected error occurred." });
  };
  