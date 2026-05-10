import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface InternshipProps {
  id: string;
  company: string;
  role: string;
  requiredSkills: string[];
}

export const InternshipCard = ({ internship }: { internship: InternshipProps }) => {
  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={['#2a2a2a', '#111111']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardBackground}
      >
        <View style={styles.innerBevel}>
          <View style={styles.header}>
            <View style={styles.iconWrapper}>
              <LinearGradient colors={['#33280a', '#1a1405']} style={styles.companyIconPlaceholder}>
                <Text style={styles.companyInitial}>{internship.company.charAt(0)}</Text>
              </LinearGradient>
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
                  <View style={styles.tagInner}>
                    <Text style={styles.tagText}>{skill}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.applyButtonWrapper}>
            <LinearGradient
              colors={['#e6c27a', '#b8860b', '#8b6508']}
              locations={[0, 0.5, 1]}
              style={styles.applyButtonGradient}
            >
              <View style={styles.applyButtonInner}>
                <Text style={styles.applyButtonText}>QUICK APPLY</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
    borderRadius: 20,
  },
  cardBackground: {
    borderRadius: 20,
    padding: 2,
  },
  innerBevel: {
    backgroundColor: '#181818',
    borderRadius: 18,
    padding: 20,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.8)',
    borderRightColor: 'rgba(0, 0, 0, 0.8)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconWrapper: {
    marginRight: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d4af37',
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
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
    color: '#d4af37',
    textShadowColor: 'rgba(212, 175, 55, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerTextContainer: {
    flex: 1,
  },
  role: {
    fontSize: 18,
    fontWeight: '900',
    color: '#d4af37',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  company: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  skillsContainer: {
    marginBottom: 24,
  },
  skillsLabel: {
    fontSize: 11,
    color: '#555',
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tagWrapper: {
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#000',
  },
  tagInner: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tagText: {
    fontSize: 11,
    color: '#aaa',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  applyButtonWrapper: {
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 12,
  },
  applyButtonGradient: {
    borderRadius: 12,
    padding: 2,
  },
  applyButtonInner: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.5)',
  },
  applyButtonText: {
    color: '#111',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
});
