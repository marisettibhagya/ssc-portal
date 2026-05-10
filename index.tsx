import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../context/AppContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function IndexScreen() {
  const router = useRouter();
  const { login, currentUser, users } = useAppContext();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'student') {
        router.replace('/(student)/community');
      } else {
        router.replace('/(coordinator)/manage');
      }
    }
  }, [currentUser, router]);

  const handleLogin = (userId: string) => {
    login(userId);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A1A1D', '#4E4E50']}
        style={styles.background}
      />
      <View style={styles.card}>
        <Text style={styles.title}>Smart Student Connect</Text>
        <Text style={styles.subtitle}>Empowering your campus experience.</Text>

        <View style={styles.loginContainer}>
          <Text style={styles.sectionTitle}>Demo Logins</Text>
          {users.map(u => (
            <TouchableOpacity
              key={u.id}
              style={styles.button}
              onPress={() => handleLogin(u.id)}
            >
              <Text style={styles.buttonText}>Login as {u.name} ({u.role})</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />

        <TouchableOpacity
          style={[styles.button, styles.outlineButton]}
          onPress={() => router.push('/(auth)/register')}
        >
          <Text style={styles.outlineButtonText}>Register New Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 40,
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37', // Gold tone
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 32,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#D4AF37',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#1A1A1D',
    fontSize: 18,
    fontWeight: '600',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D4AF37',
    marginTop: 12,
  },
  outlineButtonText: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
    marginVertical: 16,
  },
});
