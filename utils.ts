
/**
 * Safely deep merges two objects. 
 * target (usually INITIAL_CONFIG) is used as a template for keys.
 */
export const deepMerge = (target: any, source: any): any => {
  if (!source || typeof source !== 'object') return target;
  
  const output = { ...target };
  
  Object.keys(target).forEach(key => {
    if (source.hasOwnProperty(key)) {
      if (Array.isArray(target[key])) {
        // For arrays, if source has an array, we use it, otherwise target
        output[key] = Array.isArray(source[key]) ? source[key] : target[key];
      } else if (typeof target[key] === 'object' && target[key] !== null) {
        output[key] = deepMerge(target[key], source[key]);
      } else {
        output[key] = source[key];
      }
    }
  });
  
  return output;
};

export const loadConfig = (initialConfig: any) => {
  try {
    const saved = localStorage.getItem('app_config');
    if (!saved) return initialConfig;
    const parsed = JSON.parse(saved);
    return deepMerge(initialConfig, parsed);
  } catch (error) {
    console.error("Config corruption detected. Resetting to defaults.", error);
    return initialConfig;
  }
};

export const saveConfig = (config: any) => {
  try {
    localStorage.setItem('app_config', JSON.stringify(config));
  } catch (error) {
    console.error("Failed to save config to localStorage.", error);
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
