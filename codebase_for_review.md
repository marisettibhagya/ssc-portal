# Smart Student Connect - Important Codebase for Review

## File: app\index.tsx

``tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../context/AppContext';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { MotionButton } from '../components/MotionButton';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

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

  const handleStudentLogin = () => {
    router.push('/(auth)/register');
  };

  const handleCoordinatorLogin = () => {
    router.push('/(auth)/register');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* Decorative Blobs */}
      <View style={[styles.blob, styles.peachBlob]} />
      <View style={[styles.blob, styles.mintBlob]} />

      {/* Navigation */}
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <View style={styles.logoDot} />
          <Text style={styles.logoText}>SmartConnect</Text>
        </View>
        <View style={styles.navRight}>
          <Text style={styles.signInText} onPress={() => router.push('/(auth)/register')}>Sign In</Text>
          <MotionButton 
            title="Get Started →" 
            variant="solid-black" 
            onPress={() => router.push('/(auth)/register')}
          />
        </View>
      </View>

      {/* Hero Section */}
      <Animated.View entering={FadeInUp.duration(800).delay(100)} style={styles.heroContainer}>
        <Text style={styles.heroTitleOrange}>opportunity</Text>
        <Text style={styles.heroTitleBlack}>starts here.</Text>
        <Text style={styles.heroSubtitle}>
          One platform to discover hackathons, internships, community{'\n'}
          service, and more — tailored to your skills and interests.
        </Text>
        
        <View style={styles.heroButtons}>
          <MotionButton 
            title="Join as Student" 
            variant="primary-orange"
            onPress={handleStudentLogin}
            style={{ marginRight: 16 }}
          />
          <MotionButton 
            title="Post an Opportunity" 
            variant="outline-light"
            onPress={handleCoordinatorLogin}
          />
        </View>
      </Animated.View>

      {/* Stats Section */}
      <Animated.View entering={FadeInUp.duration(800).delay(300)} style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Students Joined</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Opportunities</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Organizations</Text>
        </View>
      </Animated.View>

      {/* Features Section */}
      <Animated.View entering={FadeInUp.duration(800).delay(500)} style={styles.featuresContainer}>
        <View style={styles.featureBox}>
          <View style={[styles.iconWrapper, { backgroundColor: '#FFEBEB' }]}>
            <MaterialCommunityIcons name="target" size={24} color="#FF4D4D" />
          </View>
          <Text style={styles.featureTitle}>Smart Matching</Text>
          <Text style={styles.featureDesc}>AI-powered skill and interest matching connects you to the right opportunities instantly.</Text>
        </View>

        <View style={styles.featureBox}>
          <View style={[styles.iconWrapper, { backgroundColor: '#F0F9ED' }]}>
            <MaterialCommunityIcons name="bell" size={24} color="#FFB800" />
          </View>
          <Text style={styles.featureTitle}>Instant Notifications</Text>
          <Text style={styles.featureDesc}>Get notified the moment a matching opportunity is posted — never miss a deadline.</Text>
        </View>

        <View style={styles.featureBox}>
          <View style={[styles.iconWrapper, { backgroundColor: '#F3E8FF' }]}>
            <MaterialCommunityIcons name="clipboard-check" size={24} color="#B794F4" />
          </View>
          <Text style={styles.featureTitle}>One-Click Register</Text>
          <Text style={styles.featureDesc}>Register for hackathons, internships, and community service with a single click.</Text>
        </View>

        <View style={styles.featureBox}>
          <View style={[styles.iconWrapper, { backgroundColor: '#FFF5E6' }]}>
            <Ionicons name="trophy" size={24} color="#F6AD55" />
          </View>
          <Text style={styles.featureTitle}>Track Everything</Text>
          <Text style={styles.featureDesc}>Manage all your applications and registrations from one clean dashboard.</Text>
        </View>
      </Animated.View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF8',
  },
  contentContainer: {
    minHeight: Dimensions.get('window').height,
    paddingBottom: 40,
  },
  blob: {
    position: 'absolute',
    borderRadius: 500,
    opacity: 0.5,
    ...(Platform.OS === 'web' ? { filter: 'blur(80px)' } : {}),
  },
  peachBlob: {
    top: '30%',
    right: -100,
    width: 400,
    height: 400,
    backgroundColor: '#FFE5D9',
  },
  mintBlob: {
    top: -50,
    right: 50,
    width: 300,
    height: 300,
    backgroundColor: '#E8F5E9',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoDot: {
    width: 10,
    height: 10,
    backgroundColor: '#FF5A00',
    borderRadius: 5,
    marginRight: 8,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -0.5,
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  signInText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
    marginRight: 20,
  },
  heroContainer: {
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  heroTitleOrange: {
    fontSize: 110,
    fontWeight: '900',
    color: '#FF5A00',
    letterSpacing: -4,
    lineHeight: 110,
    textAlign: 'center',
    textTransform: 'lowercase',
  },
  heroTitleBlack: {
    fontSize: 110,
    fontWeight: '900',
    color: '#111111',
    letterSpacing: -4,
    lineHeight: 110,
    textAlign: 'center',
    textTransform: 'lowercase',
    marginTop: -10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 28,
    marginTop: 30,
    marginBottom: 40,
  },
  heroButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    gap: 60,
    zIndex: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111111',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#888888',
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 80,
    paddingHorizontal: 40,
    paddingTop: 60,
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  featureBox: {
    width: '23%',
    minWidth: 200,
    marginBottom: 30,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 20,
  },
});

``

## File: app\_layout.tsx

``tsx
import { Stack } from 'expo-router';
import { AppProvider } from '../context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(student)" />
        <Stack.Screen name="(coordinator)" />
      </Stack>
    </AppProvider>
  );
}

``

## File: app\(auth)\register.tsx

``tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MotionButton } from '../../components/MotionButton';

export default function RegisterScreen() {
  const router = useRouter();
  const [role, setRole] = useState<'student' | 'coordinator'>('student');

  const handleContinue = () => {
    if (role === 'student') {
      router.push('/(auth)/onboarding-student');
    } else {
      router.push('/(auth)/onboarding-coordinator');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Join Us</Text>
        <Text style={styles.subtitle}>Select your role to continue</Text>

        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.roleCard, role === 'student' && styles.roleCardActive]}
            onPress={() => setRole('student')}
            activeOpacity={0.8}
          >
            <Text style={[styles.roleText, role === 'student' && styles.roleTextActive]}>Student</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleCard, role === 'coordinator' && styles.roleCardActive]}
            onPress={() => setRole('coordinator')}
            activeOpacity={0.8}
          >
            <Text style={[styles.roleText, role === 'coordinator' && styles.roleTextActive]}>Coordinator</Text>
          </TouchableOpacity>
        </View>

        <MotionButton 
          title="Continue" 
          variant="primary-orange" 
          onPress={handleContinue} 
          style={{ width: '100%', marginBottom: 16 }} 
        />
        
        <TouchableOpacity style={styles.linkButton} onPress={() => router.back()}>
          <Text style={styles.linkText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAF8' },
  card: { backgroundColor: '#FFFFFF', padding: 30, borderRadius: 24, width: '90%', maxWidth: 400, alignItems: 'center', borderWidth: 1, borderColor: '#F0F0F0', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  title: { fontSize: 32, fontWeight: '900', color: '#111111', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666666', marginBottom: 30 },
  roleContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 30 },
  roleCard: { flex: 1, padding: 20, borderWidth: 2, borderColor: '#E0E0E0', borderRadius: 16, alignItems: 'center', marginHorizontal: 5, backgroundColor: '#FFFFFF' },
  roleCardActive: { borderColor: '#FF5A00', backgroundColor: '#FFF0E5' },
  roleText: { color: '#666666', fontSize: 16, fontWeight: '600' },
  roleTextActive: { color: '#FF5A00', fontWeight: '800' },
  linkButton: { paddingVertical: 10 },
  linkText: { color: '#888888', fontSize: 15, fontWeight: '600' }
});

``

## File: app\(auth)\onboarding-student.tsx

``tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext, Student } from '../../context/AppContext';
import { MotionButton } from '../../components/MotionButton';

export default function OnboardingStudentScreen() {
  const router = useRouter();
  const { registerUser } = useAppContext();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    universityId: '',
    major: '',
    cgpa: '',
    resumeLink: '',
    skills: ''
  });

  const handleSubmit = () => {
    if (!form.name || !form.major) return alert("Name and Major are required.");

    const newStudent: Student = {
      id: `u${Date.now()}`,
      role: 'student',
      name: form.name,
      phone: form.phone,
      universityId: form.universityId,
      major: form.major,
      cgpa: parseFloat(form.cgpa) || 0,
      resumeLink: form.resumeLink,
      skills: form.skills.split(',').map(s => s.trim()).filter(s => s),
      appliedEvents: []
    };

    registerUser(newStudent);
    router.replace('/(student)/community');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Student Profile</Text>
          <Text style={styles.subtitle}>Tell us about yourself</Text>

          <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#888" value={form.name} onChangeText={(t) => setForm({...form, name: t})} />
          <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#888" value={form.phone} onChangeText={(t) => setForm({...form, phone: t})} />
          <TextInput style={styles.input} placeholder="University ID" placeholderTextColor="#888" value={form.universityId} onChangeText={(t) => setForm({...form, universityId: t})} />
          <TextInput style={styles.input} placeholder="Major (e.g. B.Tech ECE)" placeholderTextColor="#888" value={form.major} onChangeText={(t) => setForm({...form, major: t})} />
          <TextInput style={styles.input} placeholder="CGPA" placeholderTextColor="#888" keyboardType="numeric" value={form.cgpa} onChangeText={(t) => setForm({...form, cgpa: t})} />
          <TextInput style={styles.input} placeholder="Resume Link" placeholderTextColor="#888" value={form.resumeLink} onChangeText={(t) => setForm({...form, resumeLink: t})} />
          <TextInput style={styles.input} placeholder="Skills (comma separated)" placeholderTextColor="#888" value={form.skills} onChangeText={(t) => setForm({...form, skills: t})} />

          <MotionButton 
            title="Complete Profile" 
            variant="primary-orange" 
            onPress={handleSubmit} 
            style={{ width: '100%', marginTop: 10 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF8' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { backgroundColor: '#FFFFFF', padding: 30, borderRadius: 24, width: '100%', maxWidth: 500, borderWidth: 1, borderColor: '#F0F0F0', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  title: { fontSize: 32, fontWeight: '900', color: '#111111', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666666', marginBottom: 30, textAlign: 'center' },
  input: { backgroundColor: '#F5F5F5', color: '#111111', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E0E0E0' }
});

``

## File: app\(auth)\onboarding-coordinator.tsx

``tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext, Coordinator } from '../../context/AppContext';
import { MotionButton } from '../../components/MotionButton';

export default function OnboardingCoordinatorScreen() {
  const router = useRouter();
  const { registerUser } = useAppContext();

  const [form, setForm] = useState({
    name: '',
    department: '',
    contactInfo: '',
    title: ''
  });

  const handleSubmit = () => {
    if (!form.name || !form.department) return alert("Name and Department are required.");

    const newCoordinator: Coordinator = {
      id: `c${Date.now()}`,
      role: 'coordinator',
      name: form.name,
      department: form.department,
      contactInfo: form.contactInfo,
      title: form.title
    };

    registerUser(newCoordinator);
    router.replace('/(coordinator)/manage');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Coordinator Profile</Text>
          <Text style={styles.subtitle}>Set up your staff account</Text>

          <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#888" value={form.name} onChangeText={(t) => setForm({...form, name: t})} />
          <TextInput style={styles.input} placeholder="Title (e.g. Prof., Dr.)" placeholderTextColor="#888" value={form.title} onChangeText={(t) => setForm({...form, title: t})} />
          <TextInput style={styles.input} placeholder="Department" placeholderTextColor="#888" value={form.department} onChangeText={(t) => setForm({...form, department: t})} />
          <TextInput style={styles.input} placeholder="Contact Info" placeholderTextColor="#888" value={form.contactInfo} onChangeText={(t) => setForm({...form, contactInfo: t})} />

          <MotionButton 
            title="Complete Profile" 
            variant="primary-orange" 
            onPress={handleSubmit} 
            style={{ width: '100%', marginTop: 10 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF8' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { backgroundColor: '#FFFFFF', padding: 30, borderRadius: 24, width: '100%', maxWidth: 500, borderWidth: 1, borderColor: '#F0F0F0', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 5 },
  title: { fontSize: 32, fontWeight: '900', color: '#111111', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666666', marginBottom: 30, textAlign: 'center' },
  input: { backgroundColor: '#F5F5F5', color: '#111111', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E0E0E0' }
});

``

## File: app\(student)\_layout.tsx

``tsx
import React, { useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { useAppContext } from '../../context/AppContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function StudentLayout() {
  const { currentUser } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'student') {
      router.replace('/');
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'student') return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#FAFAF8' },
        headerTintColor: '#111111',
        tabBarStyle: { backgroundColor: '#FFFFFF', borderTopColor: '#E0E0E0' },
        tabBarActiveTintColor: '#FF5A00',
        tabBarInactiveTintColor: '#A0A0A0',
        tabBarPosition: 'top',
      }}
    >
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color }) => <MaterialIcons name="people" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tech"
        options={{
          title: 'Tech Services',
          tabBarIcon: ({ color }) => <MaterialIcons name="computer" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

``

## File: app\(student)\community.tsx

``tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MotionButton } from '../../components/MotionButton';
import { useAppContext, Event, Student } from '../../context/AppContext';

const CATEGORIES = ['All', 'Hackathon', 'Blood Donation', 'Sports', 'Fest'];

export default function CommunityScreen() {
  const { events, currentUser, registerForEvent } = useAppContext();
  const [activeTab, setActiveTab] = useState('All');

  const student = currentUser as Student;
  const appliedEvents = student?.appliedEvents || [];

  const communityEvents = events.filter(e => e.category === 'Community' || e.category === 'Sports' || e.type === 'Hackathon' || e.type === 'Fest' || e.type === 'Blood Donation');
  
  const filteredEvents = activeTab === 'All' 
    ? communityEvents 
    : communityEvents.filter(e => e.type.toLowerCase().includes(activeTab.toLowerCase()));

  const renderEvent = ({ item }: { item: Event }) => {
    const isRegistered = appliedEvents.includes(item.id);
    return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.eventType}>{item.type}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
      </View>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventRegistrations}>{item.registrations} Registrations</Text>
      <MotionButton 
        title={isRegistered ? "Registered" : "Register / Join"} 
        variant={isRegistered ? "outline-light" : "primary-red"} 
        style={{ width: '100%', paddingVertical: 18, marginTop: 5 }}
        textStyle={{ fontSize: 18 }}
        onPress={() => {
          if (!isRegistered) registerForEvent(item.id);
        }} 
      />
    </View>
  )};

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <FlatList
          horizontal
          data={CATEGORIES}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.tab, activeTab === item && styles.activeTab]}
              onPress={() => setActiveTab(item)}
            >
              <Text style={[styles.tabText, activeTab === item && styles.activeTabText]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id}
        renderItem={renderEvent}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No events found in this category.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF8' },
  tabsContainer: { paddingVertical: 15, paddingHorizontal: 10, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  tab: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, marginRight: 10, backgroundColor: '#F5F5F5' },
  activeTab: { backgroundColor: '#FF5A00' },
  tabText: { color: '#666666', fontWeight: '500' },
  activeTabText: { color: '#FFFFFF', fontWeight: 'bold' },
  listContainer: { padding: 15 },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 15, borderWidth: 1, borderColor: '#F0F0F0', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  eventType: { color: '#FF5A00', fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
  eventDate: { color: '#888888', fontSize: 12 },
  eventTitle: { color: '#111111', fontSize: 18, fontWeight: '800', marginBottom: 5 },
  eventRegistrations: { color: '#666666', fontSize: 14, marginBottom: 15 },
  emptyText: { color: '#888888', textAlign: 'center', marginTop: 50, fontSize: 16 }
});

``

## File: app\(student)\profile.tsx

``tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppContext, Student } from '../../context/AppContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MotionButton } from '../../components/MotionButton';

export default function StudentProfileScreen() {
  const { currentUser, logout } = useAppContext();
  const router = useRouter();

  const student = currentUser as Student;

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  if (!student) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.roundProfileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{student.name?.charAt(0) || 'S'}</Text>
        </View>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.major}>{student.major}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Academic Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>CGPA</Text>
          <Text style={styles.detailValue}>{student.cgpa}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>University ID</Text>
          <Text style={styles.detailValue}>{student.universityId || 'N/A'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {student.skills?.map(skill => (
            <View key={skill} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ width: '100%', maxWidth: 500, alignItems: 'center' }}>
        <MotionButton 
          title="Edit Profile" 
          variant="primary-orange" 
          onPress={() => {}} 
          style={{ marginBottom: 15, width: '100%' }}
        />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="#FF4D4D" />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF8' },
  content: { padding: 20, alignItems: 'center' },
  roundProfileSection: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: 400,
    borderRadius: 40,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#FFF0E5', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 2, borderColor: '#FF5A00' },
  avatarText: { fontSize: 48, fontWeight: '900', color: '#FF5A00' },
  name: { fontSize: 26, fontWeight: '800', color: '#111111', marginBottom: 6 },
  major: { fontSize: 16, color: '#666666', fontWeight: '500' },
  section: { 
    width: '100%', 
    maxWidth: 500, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 24, 
    padding: 24, 
    marginBottom: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1, 
    borderColor: '#F0F0F0' 
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111111', marginBottom: 20 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  detailLabel: { color: '#666666', fontSize: 15 },
  detailValue: { color: '#111111', fontSize: 15, fontWeight: '600' },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  skillBadge: { backgroundColor: '#F5F5F5', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  skillText: { color: '#555555', fontSize: 14, fontWeight: '600' },
  logoutButton: { flexDirection: 'row', backgroundColor: '#FFF5F5', paddingVertical: 16, paddingHorizontal: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#FFE5E5', width: '100%' },
  logoutButtonText: { color: '#FF4D4D', fontSize: 16, fontWeight: '700', marginLeft: 8 }
});

``

## File: app\(student)\tech.tsx

``tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MotionButton } from '../../components/MotionButton';
import { useAppContext, Event, Student } from '../../context/AppContext';

export default function TechScreen() {
  const { events, currentUser, registerForEvent } = useAppContext();

  const student = currentUser as Student;
  const appliedEvents = student?.appliedEvents || [];

  const techEvents = events.filter(e => e.category === 'Tech' || e.type === 'Internship' || e.type === 'Drive');

  const renderEvent = ({ item }: { item: Event }) => {
    const isApplied = appliedEvents.includes(item.id);
    return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.companyName}>{item.company || 'Unknown Company'}</Text>
        <Text style={styles.eventType}>{item.type}</Text>
      </View>
      <Text style={styles.eventTitle}>{item.title}</Text>
      
      {item.requiredSkills && (
        <View style={styles.skillsContainer}>
          {item.requiredSkills.map(skill => (
            <View key={skill} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      )}
      
      <View style={styles.footer}>
        <Text style={styles.eventRegistrations}>{item.registrations} Applied</Text>
      </View>
      <MotionButton 
        title={isApplied ? "Applied" : "Apply Now"} 
        variant={isApplied ? "outline-light" : "primary-red"} 
        style={{ width: '100%', paddingVertical: 18, marginTop: 15 }}
        textStyle={{ fontSize: 18 }}
        onPress={() => {
          if (!isApplied) registerForEvent(item.id);
        }} 
      />
    </View>
  )};

  return (
    <View style={styles.container}>
      <FlatList
        data={techEvents}
        keyExtractor={item => item.id}
        renderItem={renderEvent}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No tech opportunities available at the moment.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF8' },
  listContainer: { padding: 15 },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 15, borderWidth: 1, borderColor: '#F0F0F0', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  companyName: { color: '#666666', fontSize: 14, fontWeight: '600' },
  eventType: { color: '#FF5A00', fontSize: 12, fontWeight: '800', textTransform: 'uppercase', backgroundColor: '#FFF0E5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, overflow: 'hidden' },
  eventTitle: { color: '#111111', fontSize: 20, fontWeight: '800', marginBottom: 15 },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
  skillBadge: { backgroundColor: '#F5F5F5', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, marginRight: 8, marginBottom: 8 },
  skillText: { color: '#555555', fontSize: 12, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  eventRegistrations: { color: '#888888', fontSize: 14, fontWeight: '500' },
  emptyText: { color: '#888888', textAlign: 'center', marginTop: 50, fontSize: 16 }
});

``

## File: app\(coordinator)\_layout.tsx

``tsx
import React, { useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { useAppContext } from '../../context/AppContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function CoordinatorLayout() {
  const { currentUser } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'coordinator') {
      router.replace('/');
    }
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== 'coordinator') return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#FAFAF8' },
        headerTintColor: '#111111',
        tabBarStyle: { backgroundColor: '#FFFFFF', borderTopColor: '#E0E0E0' },
        tabBarActiveTintColor: '#FF5A00',
        tabBarInactiveTintColor: '#A0A0A0',
        tabBarPosition: 'top',
      }}
    >
      <Tabs.Screen
        name="manage"
        options={{
          title: 'Manage Events',
          tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create Event',
          tabBarIcon: ({ color }) => <MaterialIcons name="add-circle" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

``

## File: app\(coordinator)\create.tsx

``tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MotionButton } from '../../components/MotionButton';
import { useRouter } from 'expo-router';
import { useAppContext, Event } from '../../context/AppContext';

export default function CreateEventScreen() {
  const router = useRouter();
  const { createEvent, currentUser } = useAppContext();

  const [form, setForm] = useState({
    title: '',
    type: '',
    category: 'Community',
    date: '',
    description: '',
    requiredSkills: '',
    maxCapacity: ''
  });

  const handleSubmit = () => {
    if (!form.title || !form.type || !form.date) {
      alert("Title, Type, and Date are required.");
      return;
    }

    const newEvent: Event = {
      id: `e${Date.now()}`,
      creatorId: currentUser?.id || '',
      type: form.type,
      category: form.type.toLowerCase().includes('internship') || form.type.toLowerCase().includes('drive') ? 'Tech' : 'Community',
      title: form.title,
      date: form.date,
      description: form.description,
      requiredSkills: form.requiredSkills ? form.requiredSkills.split(',').map(s => s.trim()) : undefined,
      maxCapacity: form.maxCapacity,
      registrations: 0
    };

    createEvent(newEvent);
    
    // Reset form
    setForm({
      title: '', type: '', category: 'Community', date: '', description: '', requiredSkills: '', maxCapacity: ''
    });

    router.replace('/(coordinator)/manage');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Publish New Event</Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event Title *</Text>
          <TextInput style={styles.input} placeholder="e.g. CodeFest 2026" placeholderTextColor="#888" value={form.title} onChangeText={t => setForm({...form, title: t})} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event Type *</Text>
          <TextInput style={styles.input} placeholder="e.g. Hackathon, Drive, Fest" placeholderTextColor="#888" value={form.type} onChangeText={t => setForm({...form, type: t})} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date *</Text>
          <TextInput style={styles.input} placeholder="YYYY-MM-DD" placeholderTextColor="#888" value={form.date} onChangeText={t => setForm({...form, date: t})} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={[styles.input, styles.textArea]} placeholder="Briefly describe the event..." placeholderTextColor="#888" multiline numberOfLines={4} value={form.description} onChangeText={t => setForm({...form, description: t})} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Required Skills (comma separated)</Text>
          <TextInput style={styles.input} placeholder="e.g. React, Node.js, Python" placeholderTextColor="#888" value={form.requiredSkills} onChangeText={t => setForm({...form, requiredSkills: t})} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Max Capacity</Text>
          <TextInput style={styles.input} placeholder="Leave blank for unlimited" placeholderTextColor="#888" keyboardType="numeric" value={form.maxCapacity} onChangeText={t => setForm({...form, maxCapacity: t})} />
        </View>

        <MotionButton 
          title="Publish Event" 
          variant="primary-orange" 
          onPress={handleSubmit} 
          style={{ width: '100%', marginTop: 10 }} 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF8' },
  content: { padding: 20, paddingBottom: 40 },
  pageTitle: { fontSize: 24, fontWeight: '800', color: '#111111', marginBottom: 20 },
  formContainer: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#F0F0F0', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  inputGroup: { marginBottom: 15 },
  label: { color: '#666666', fontSize: 14, marginBottom: 8, fontWeight: '600' },
  input: { backgroundColor: '#F5F5F5', color: '#111111', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E0E0E0' },
  textArea: { minHeight: 100, textAlignVertical: 'top' }
});

``

## File: app\(coordinator)\manage.tsx

``tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { MotionButton } from '../../components/MotionButton';
import { useAppContext, Event } from '../../context/AppContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function ManageScreen() {
  const { events, currentUser } = useAppContext();

  // Show events created by this coordinator
  const myEvents = events.filter(e => e.creatorId === currentUser?.id);

  const renderEvent = ({ item }: { item: Event }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.eventType}>{item.type}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
      </View>
      <Text style={styles.eventTitle}>{item.title}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <MaterialIcons name="people" size={20} color="#D4AF37" />
          <Text style={styles.statNumber}>{item.registrations}</Text>
          <Text style={styles.statLabel}>Registrations</Text>
        </View>
        <View style={styles.statBox}>
          <MaterialIcons name="groups" size={20} color="#A0A0A0" />
          <Text style={[styles.statNumber, {color: '#A0A0A0'}]}>{item.maxCapacity || 'Unlimited'}</Text>
          <Text style={styles.statLabel}>Capacity</Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <MotionButton title="Edit" variant="outline-light" onPress={() => Alert.alert("Edit", "Coming soon")} style={{ flex: 1, marginRight: 10 }} />
        <MotionButton title="View Attendees" variant="primary-orange" onPress={() => Alert.alert("Attendees", "Coming soon")} style={{ flex: 2 }} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={myEvents}
        keyExtractor={item => item.id}
        renderItem={renderEvent}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="event-note" size={60} color="#3A3A3D" />
            <Text style={styles.emptyText}>You haven't created any events yet.</Text>
            <Text style={styles.emptySubtext}>Go to the Create tab to publish your first event.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF8' },
  listContainer: { padding: 15 },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 15, borderWidth: 1, borderColor: '#F0F0F0', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  eventType: { color: '#FF5A00', fontSize: 12, fontWeight: '800', textTransform: 'uppercase', backgroundColor: '#FFF0E5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, overflow: 'hidden' },
  eventDate: { color: '#888888', fontSize: 14 },
  eventTitle: { color: '#111111', fontSize: 20, fontWeight: '800', marginBottom: 15 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FAFAF8', borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#F0F0F0' },
  statBox: { alignItems: 'center', flex: 1 },
  statNumber: { color: '#111111', fontSize: 24, fontWeight: '800', marginVertical: 5 },
  statLabel: { color: '#666666', fontSize: 12, fontWeight: '600' },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  emptyText: { color: '#111111', fontSize: 18, fontWeight: '800', marginTop: 15, marginBottom: 5 },
  emptySubtext: { color: '#888888', fontSize: 14 }
});

``

## File: app\(coordinator)\profile.tsx

``tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppContext, Coordinator } from '../../context/AppContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MotionButton } from '../../components/MotionButton';

export default function CoordinatorProfileScreen() {
  const { currentUser, logout } = useAppContext();
  const router = useRouter();

  const coordinator = currentUser as Coordinator;

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  if (!coordinator) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.roundProfileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{coordinator.name?.charAt(0) || 'C'}</Text>
        </View>
        <Text style={styles.name}>{coordinator.title ? `${coordinator.title} ` : ''}{coordinator.name}</Text>
        <Text style={styles.roleText}>Faculty Coordinator</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Department</Text>
          <Text style={styles.detailValue}>{coordinator.department}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Contact Info</Text>
          <Text style={styles.detailValue}>{coordinator.contactInfo || 'N/A'}</Text>
        </View>
      </View>

      <View style={{ width: '100%', maxWidth: 500, alignItems: 'center' }}>
        <MotionButton 
          title="Edit Profile" 
          variant="primary-orange" 
          onPress={() => {}} 
          style={{ marginBottom: 15, width: '100%' }}
        />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="#FF4D4D" />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF8' },
  content: { padding: 20, alignItems: 'center' },
  roundProfileSection: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: 400,
    borderRadius: 40,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#FFF0E5', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 2, borderColor: '#FF5A00' },
  avatarText: { fontSize: 48, fontWeight: '900', color: '#FF5A00' },
  name: { fontSize: 26, fontWeight: '800', color: '#111111', marginBottom: 6, textAlign: 'center' },
  roleText: { fontSize: 16, color: '#FF5A00', fontWeight: '600' },
  section: { 
    width: '100%', 
    maxWidth: 500, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 24, 
    padding: 24, 
    marginBottom: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1, 
    borderColor: '#F0F0F0' 
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111111', marginBottom: 20 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  detailLabel: { color: '#666666', fontSize: 15 },
  detailValue: { color: '#111111', fontSize: 15, fontWeight: '600' },
  logoutButton: { flexDirection: 'row', backgroundColor: '#FFF5F5', paddingVertical: 16, paddingHorizontal: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#FFE5E5', width: '100%' },
  logoutButtonText: { color: '#FF4D4D', fontSize: 16, fontWeight: '700', marginLeft: 8 }
});

``

## File: components\EventCard.tsx

``tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { MotionButton } from './MotionButton';

interface EventProps {
  id: string;
  title: string;
  type: string;
  date: string;
  maxTeamSize: number;
  openRoles: string[];
}

export const EventCard = ({ event }: { event: EventProps }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardBackground}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.title}</Text>
          <View style={styles.badgeWrapper}>
            <Text style={styles.badgeText}>{event.type}</Text>
          </View>
        </View>
        
        <Text style={styles.detailText}>Date: <Text style={styles.detailValue}>{event.date}</Text></Text>
        <Text style={styles.detailText}>Max Team Size: <Text style={styles.detailValue}>{event.maxTeamSize}</Text></Text>
        
        <View style={styles.rolesContainer}>
          <Text style={styles.rolesLabel}>OPEN ROLES</Text>
          <View style={styles.tagsWrapper}>
            {event.openRoles.map((role, idx) => (
              <View key={idx} style={styles.tagWrapper}>
                <Text style={styles.tagText}>{role}</Text>
              </View>
            ))}
          </View>
        </View>

        <MotionButton 
          title="JOIN TEAM" 
          variant="primary-orange" 
          onPress={() => setModalVisible(true)} 
        />

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalWrapper}>
              <View style={styles.modalBackground}>
                <Text style={styles.modalTitle}>Join {event.title}</Text>
                <Text style={styles.modalSubtitle}>How would you like to participate?</Text>
                
                <MotionButton 
                  title="JOIN AS MEMBER" 
                  variant="primary-orange" 
                  onPress={() => setModalVisible(false)} 
                  style={{ marginBottom: 12 }}
                />
                
                <MotionButton 
                  title="CREATE AS TEAM LEAD" 
                  variant="solid-black" 
                  onPress={() => setModalVisible(false)} 
                  style={{ marginBottom: 16 }}
                />

                <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>CANCEL</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderRadius: 16,
  },
  cardBackground: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111111',
    flex: 1,
  },
  badgeWrapper: {
    marginLeft: 12,
    backgroundColor: '#FFF0E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#FF5A00',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
    fontWeight: '500',
  },
  detailValue: {
    color: '#333',
    fontWeight: '600',
  },
  rolesContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  rolesLabel: {
    fontSize: 11,
    color: '#888',
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagWrapper: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalWrapper: {
    width: '100%',
    maxWidth: 400,
  },
  modalBackground: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111111',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 30,
    textAlign: 'center',
  },
  closeButton: {
    paddingTop: 12,
    paddingBottom: 4,
  },
  closeButtonText: {
    color: '#888',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

``

## File: components\InternshipCard.tsx

``tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotionButton } from './MotionButton';

interface InternshipProps {
  id: string;
  company: string;
  role: string;
  requiredSkills: string[];
}

export const InternshipCard = ({ internship }: { internship: InternshipProps }) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardBackground}>
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <View style={styles.companyIconPlaceholder}>
              <Text style={styles.companyInitial}>{internship.company.charAt(0)}</Text>
            </View>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.role}>{internship.role}</Text>
            <Text style={styles.company}>{internship.company}</Text>
          </View>
        </View>
        
        <View style={styles.skillsContainer}>
          <Text style={styles.skillsLabel}>REQUIRED SKILLS</Text>
          <View style={styles.tagsWrapper}>
            {internship.requiredSkills.map((skill, idx) => (
              <View key={idx} style={styles.tagWrapper}>
                <Text style={styles.tagText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <MotionButton 
          title="QUICK APPLY" 
          variant="primary-orange" 
          onPress={() => {}} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderRadius: 16,
  },
  cardBackground: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconWrapper: {
    marginRight: 16,
    borderRadius: 14,
    backgroundColor: '#FFF0E5',
    borderWidth: 1,
    borderColor: '#FFE0CC',
  },
  companyIconPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyInitial: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FF5A00',
  },
  headerTextContainer: {
    flex: 1,
  },
  role: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  company: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  skillsContainer: {
    marginBottom: 24,
  },
  skillsLabel: {
    fontSize: 11,
    color: '#888',
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagWrapper: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
});

``

## File: components\MotionButton.tsx

``tsx
import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming
} from 'react-native-reanimated';

interface MotionButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary-orange' | 'primary-red' | 'outline-light' | 'solid-black';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const MotionButton = ({ onPress, title, style, textStyle, variant = 'primary-orange' }: MotionButtonProps) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const shadowY = useSharedValue(2);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
      shadowOffset: { width: 0, height: shadowY.value }
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { stiffness: 300, damping: 15 });
    opacity.value = withTiming(0.8, { duration: 150 });
    shadowY.value = withSpring(0, { stiffness: 300, damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { stiffness: 300, damping: 15 });
    opacity.value = withTiming(1, { duration: 150 });
    shadowY.value = withSpring(2, { stiffness: 300, damping: 15 });
  };

  let containerStyle;
  let labelStyle;

  switch (variant) {
    case 'outline-light':
      containerStyle = styles.outlineContainer;
      labelStyle = styles.outlineText;
      break;
    case 'solid-black':
      containerStyle = styles.blackContainer;
      labelStyle = styles.blackText;
      break;
    case 'primary-red':
      containerStyle = styles.redContainer;
      labelStyle = styles.redText;
      break;
    case 'primary-orange':
    default:
      containerStyle = styles.orangeContainer;
      labelStyle = styles.orangeText;
      break;
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.baseContainer, containerStyle, style, animatedStyle]}
    >
      <Text style={[styles.baseText, labelStyle, textStyle]}>{title}</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 50, // Pill shape
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  baseText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  orangeContainer: {
    backgroundColor: '#FF5A00',
  },
  orangeText: {
    color: '#FFFFFF',
  },
  redContainer: {
    backgroundColor: '#FF2A2A',
  },
  redText: {
    color: '#FFFFFF',
  },
  outlineContainer: {
    backgroundColor: '#FAFAF8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  outlineText: {
    color: '#111111',
  },
  blackContainer: {
    backgroundColor: '#111111',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  blackText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

``

