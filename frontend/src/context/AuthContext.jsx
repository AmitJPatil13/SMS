

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { USER_ROLES, createUser } from '../types';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: createUser(user)
          });
        } catch (error) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      // Mock API call - replace with actual API
      const response = await mockLogin(email, password);
      
      if (response.success) {
        const user = createUser(response.user);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userData', JSON.stringify(user));
        
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: user
        });
        
        return { success: true };
      } else {
        dispatch({
          type: AUTH_ACTIONS.LOGIN_FAILURE,
          payload: response.message
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: 'Login failed. Please try again.'
      });
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return state.user && state.user.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return state.user && roles.includes(state.user.role);
  };

  const value = {
    ...state,
    login,
    logout,
    clearError,
    hasRole,
    hasAnyRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock login function - replace with actual API call
const mockLogin = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock users for testing
  const mockUsers = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@school.com',
      password: 'admin123',
      role: USER_ROLES.ADMIN,
      avatar: '/default-avatar.png'
    },
    {
      id: 2,
      name: 'John Teacher',
      email: 'teacher@school.com',
      password: 'teacher123',
      role: USER_ROLES.TEACHER,
      avatar: '/default-avatar.png'
    },
    {
      id: 3,
      name: 'Alice Student',
      email: 'student@school.com',
      password: 'student123',
      role: USER_ROLES.STUDENT,
      avatar: '/default-avatar.png'
    },
    {
      id: 4,
      name: 'Bob Parent',
      email: 'parent@school.com',
      password: 'parent123',
      role: USER_ROLES.PARENT,
      avatar: '/default-avatar.png'
    }
  ];

  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    return {
      success: true,
      user: { ...user, password: undefined }, // Remove password from response
      token: 'mock-jwt-token-' + user.id
    };
  } else {
    return {
      success: false,
      message: 'Invalid email or password'
    };
  }
};
