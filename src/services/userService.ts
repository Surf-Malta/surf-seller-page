// src/services/userService.ts
import { ref, push, set, get } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";

export interface UserRegistrationData {
  // Step 1: Basic Info
  boothIdentity: string;
  boothTitle: string;
  agreeToTerms: boolean;
  hearAboutUs: string;

  // Step 2: Personal Information
  firstName: string;
  lastName: string;
  address: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;

  // Step 3: Shipping
  shippingMethod: "free" | "flat" | "calculated";

  // Step 4: Advertising
  advertiseItems: boolean;
  phoneNumber?: string;
}

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  role: "seller" | "admin" | "user";
  boothIdentity: string;
  boothTitle: string;
  status: "active" | "pending" | "suspended";
  createdAt: string;
  profile: {
    firstName: string;
    lastName: string;
    address: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    phoneNumber?: string;
  };
  preferences: {
    shippingMethod: "free" | "flat" | "calculated";
    advertiseItems: boolean;
    hearAboutUs: string;
  };
}

export class UserService {
  // Check if booth identity is available
  static async checkBoothIdentityAvailability(
    boothIdentity: string
  ): Promise<boolean> {
    try {
      if (!realtimeDb) throw new Error("Firebase not initialized");

      const usersRef = ref(realtimeDb, "users");
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const users = snapshot.val();
        const existingUser = Object.values(users).find(
          (user: any) =>
            user.boothIdentity?.toLowerCase() === boothIdentity.toLowerCase()
        );
        return !existingUser; // Return true if available (not found)
      }

      return true; // Available if no users exist yet
    } catch (error) {
      console.error("Error checking booth identity availability:", error);
      throw error;
    }
  }

  // Register a new user
  static async registerUser(
    registrationData: UserRegistrationData
  ): Promise<RegisteredUser> {
    try {
      if (!realtimeDb) throw new Error("Firebase not initialized");

      // Check booth identity availability first
      const isAvailable = await this.checkBoothIdentityAvailability(
        registrationData.boothIdentity
      );
      if (!isAvailable) {
        throw new Error(
          "Booth identity is already taken. Please choose a different one."
        );
      }

      // Create user reference
      const usersRef = ref(realtimeDb, "users");
      const newUserRef = push(usersRef);
      const userId = newUserRef.key!;

      // Generate email from booth identity (you might want to collect actual email)
      const email = `${registrationData.boothIdentity}@surfstore.local`;

      // Prepare user data
      const userData: RegisteredUser = {
        id: userId,
        name: `${registrationData.firstName} ${registrationData.lastName}`,
        email: email,
        role: "seller",
        boothIdentity: registrationData.boothIdentity,
        boothTitle: registrationData.boothTitle,
        status: "active",
        createdAt: new Date().toISOString(),
        profile: {
          firstName: registrationData.firstName,
          lastName: registrationData.lastName,
          address: registrationData.address,
          addressLine2: registrationData.addressLine2,
          city: registrationData.city,
          state: registrationData.state,
          country: registrationData.country,
          zipCode: registrationData.zipCode,
          phoneNumber: registrationData.phoneNumber,
        },
        preferences: {
          shippingMethod: registrationData.shippingMethod,
          advertiseItems: registrationData.advertiseItems,
          hearAboutUs: registrationData.hearAboutUs,
        },
      };

      // Save to Firebase
      await set(newUserRef, userData);

      // Also create a booth entry for the user
      const boothsRef = ref(realtimeDb, `booths/${userId}`);
      await set(boothsRef, {
        boothId: userId,
        boothIdentity: registrationData.boothIdentity,
        boothTitle: registrationData.boothTitle,
        ownerId: userId,
        status: "active",
        createdAt: new Date().toISOString(),
        settings: {
          shippingMethod: registrationData.shippingMethod,
          advertiseItems: registrationData.advertiseItems,
        },
      });

      return userData;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  // Get user by ID
  static async getUserById(userId: string): Promise<RegisteredUser | null> {
    try {
      if (!realtimeDb) throw new Error("Firebase not initialized");

      const userRef = ref(realtimeDb, `users/${userId}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        return snapshot.val() as RegisteredUser;
      }

      return null;
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  }

  // Update user profile
  static async updateUserProfile(
    userId: string,
    updates: Partial<RegisteredUser>
  ): Promise<void> {
    try {
      if (!realtimeDb) throw new Error("Firebase not initialized");

      const userRef = ref(realtimeDb, `users/${userId}`);
      await set(userRef, { ...updates, updatedAt: new Date().toISOString() });
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }
}
