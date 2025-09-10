import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  theme: 'light',
  isDark: false
};

// Action types
const THEME_ACTIONS = {
  SET_THEME: 'SET_THEME',
  TOGGLE_THEME: 'TOGGLE_THEME',
  INIT_THEME: 'INIT_THEME'
};

// Reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case THEME_ACTIONS.SET_THEME:
      return {
        theme: action.payload,
        isDark: action.payload === 'dark'
      };
    case THEME_ACTIONS.TOGGLE_THEME:
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      return {
        theme: newTheme,
        isDark: newTheme === 'dark'
      };
    case THEME_ACTIONS.INIT_THEME:
      return {
        theme: action.payload,
        isDark: action.payload === 'dark'
      };
    default:
      return state;
  }
};

// Create context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = () => {
      // Check localStorage first
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        dispatch({ type: THEME_ACTIONS.INIT_THEME, payload: savedTheme });
        applyTheme(savedTheme);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? 'dark' : 'light';
        dispatch({ type: THEME_ACTIONS.INIT_THEME, payload: systemTheme });
        applyTheme(systemTheme);
        localStorage.setItem('theme', systemTheme);
      }
    };

    initializeTheme();
  }, []);

  // Apply theme to document
  const applyTheme = (theme) => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // Set theme function
  const setTheme = (theme) => {
    if (theme === 'light' || theme === 'dark') {
      dispatch({ type: THEME_ACTIONS.SET_THEME, payload: theme });
      applyTheme(theme);
      localStorage.setItem('theme', theme);
    }
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: THEME_ACTIONS.TOGGLE_THEME });
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        const systemTheme = e.matches ? 'dark' : 'light';
        dispatch({ type: THEME_ACTIONS.SET_THEME, payload: systemTheme });
        applyTheme(systemTheme);
        localStorage.setItem('theme', systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = {
    ...state,
    setTheme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
