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
