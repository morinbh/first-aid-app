/**
 * Returns steps, title, and whether the current view is the sub-category picker.
 * @param {Object} symptoms - SYMPTOMS data object
 * @param {string|null} symptomKey - selected symptom key
 * @param {string|null} subKey - selected sub-category key (for categories)
 * @returns {{ steps: string[], title: string|null, isSubMenu: boolean }}
 */
export function getStepsAndMeta(symptoms, symptomKey, subKey) {
  if (!symptomKey || !symptoms[symptomKey]) {
    return { steps: [], title: null, isSubMenu: false };
  }

  const data = symptoms[symptomKey];

  if (data.isCategory && !subKey) {
    return { steps: [], title: null, isSubMenu: true };
  }

  if (data.isCategory && subKey && data.subOptions?.[subKey]) {
    const sub = data.subOptions[subKey];
    return {
      steps: sub.steps ?? [],
      title: subKey,
      isSubMenu: false
    };
  }

  return {
    steps: data.steps ?? [],
    title: symptomKey,
    isSubMenu: false
  };
}
