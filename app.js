const { useState, useEffect } = React;

// Define Global Constants
const DEFAULT_TOTES = ['TB-S001', 'TB-S002', 'TB-A20', 'TB-B35', 'TB-Z99'];

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJXvOrMkP1qOka-WngvNPjOEwKM7smxtg",
  authDomain: "seed-inventory-app.firebaseapp.com",
  projectId: "seed-inventory-app",
  storageBucket: "seed-inventory-app.firebasestorage.app",
  messagingSenderId: "918505019673",
  appId: "1:918505019673:web:fe94c52cdc2bb59b360d88"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Icon components
const Search = ({ className }) => React.createElement('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' })
);

const Plus = ({ className }) => React.createElement('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M12 4v16m8-8H4' })
);

const Package = ({ className }) => React.createElement('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
);

const Camera = ({ className }) => React.createElement('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' }),
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M15 13a3 3 0 11-6 0 3 3 0 016 0z' })
);

const Download = ({ className }) => React.createElement('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' })
);

const Upload = ({ className }) => React.createElement('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' })
);

const X = ({ className }) => React.createElement('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M6 18L18 6M6 6l12 12' })
);

const CheckCircle = ({ className }) => React.createElement('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
);

const Key = ({ className }) => React.createElement('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' })
);

const LogOut = ({ className }) => React.createElement('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' })
);

// NEW: Settings Icon
const Settings = ({ className }) => React.createElement('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.527.27.765.578.966.965.176.33.197.716.142 1.157-.058.46-.153.886-.296 1.285-.12.33-.275.632-.462.903-.223.33-.497.604-.814.827-.47.33-.94.498-1.396.498-.596 0-1.07-.373-1.427-.903-.357-.53-.518-1.125-.48-1.748.046-.732.336-1.42.846-2.035.51-.616 1.15-1.104 1.884-1.44zM12 15a3 3 0 100-6 3 3 0 000 6z' })
);

// HELPER FUNCTION: Deletes documents in a collection in batches (for clear database)
const deleteCollection = async (collectionRef, batchSize = 100) => {
    const query = collectionRef.limit(batchSize);
    let snapshot = await query.get();

    while (snapshot.size > 0) {
        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        
        // Get the next batch
        snapshot = await query.get();
    }
};

function SeedInventoryApp() {
  const [view, setView] = useState('setup');
  const [workspaceId, setWorkspaceId] = useState('');
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [inputWorkspaceId, setInputWorkspaceId] = useState('');
  const [experiments, setExperiments] = useState([]);
  const [toteBoxes, setToteBoxes] = useState(DEFAULT_TOTES);
  const [searchQuery, setSearchQuery] = useState('');
  const [newExperiment, setNewExperiment] = useState({ name: '', toteId: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showImportHelp, setShowImportHelp] = useState(false);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  // NEW STATE: To manage the Add Experiment flow
  const [toteInputMode, setToteInputMode] = useState('select'); // 'select' or 'new'
  const [newToteId, setNewToteId] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);


  // Check for existing workspace on load
  useEffect(() => {
    const savedWorkspaceId = localStorage.getItem('workspaceId');
    if (savedWorkspaceId) {
      setWorkspaceId(savedWorkspaceId);
      setView('home');
    }
    setIsLoading(false);
  }, []);

  // Removed old tote loading useEffect (Fix 2: Tote ID persistence)

  // Real-time listener for experiments AND totes (Fix 2: Tote ID persistence)
  useEffect(() => {
    if (!workspaceId) {
        // Reset toteBoxes to defaults when no workspace is active
        setToteBoxes(DEFAULT_TOTES);
        // Also clear experiments
        setExperiments([]);
        return;
    }

    // Set the base totes for the workspace (defaults + any file-loaded)
    // For this version, we will only use the hardcoded defaults as the base.
    const baseTotes = [...DEFAULT_TOTES];
    setToteBoxes(baseTotes.sort());

    let unsubscribeExp = () => {};
    let unsubscribeTotes = () => {};

    // Listener for Experiments
    unsubscribeExp = db.collection('workspaces')
      .doc(workspaceId)
      .collection('experiments')
      .orderBy('dateAdded', 'desc')
      .onSnapshot(snapshot => {
        const exps = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setExperiments(exps);
      }, error => {
        console.error('Error loading experiments:', error);
        setError('Failed to load experiments. Please check your connection.');
      });

    // Listener for Totes
    // This listener now ensures dynamic totes are correctly merged with the *current* baseTotes
    unsubscribeTotes = db.collection('workspaces')
      .doc(workspaceId)
      .collection('totes')
      .onSnapshot(snapshot => {
        const dynamicTotes = snapshot.docs.map(doc => doc.id);
        
        setToteBoxes(() => {
            // Use a Set to ensure unique IDs, starting with the base totes
            const uniqueTotes = new Set(baseTotes); 
            dynamicTotes.forEach(tote => uniqueTotes.add(tote));
            
            return Array.from(uniqueTotes).sort();
        });

      }, error => {
        console.error('Error loading dynamic totes:', error);
      });

    return () => {
      unsubscribeExp();
      unsubscribeTotes();
    };
  }, [workspaceId]);

  const sanitizeWorkspaceName = (name) => {
    // Convert to lowercase, replace spaces and special chars with hyphens
    return name.toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  const handleCreateWorkspace = async () => {
    if (!newWorkspaceName.trim()) {
      setError('Please enter a workspace name');
      return;
    }

    const sanitizedName = sanitizeWorkspaceName(newWorkspaceName);
    
    if (sanitizedName.length < 3) {
      setError('Workspace name must be at least 3 characters');
      return;
    }

    setIsCreating(true);
    setError('');

    try {
      // Check if workspace already exists
      const doc = await db.collection('workspaces').doc(sanitizedName).get();
      
      if (doc.exists) {
        setError('This workspace name is already taken. Please choose another.');
        setIsCreating(false);
        return;
      }

      // Create workspace
      await db.collection('workspaces').doc(sanitizedName).set({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: sanitizedName,
        displayName: newWorkspaceName.trim()
      });

      setWorkspaceId(sanitizedName);
      localStorage.setItem('workspaceId', sanitizedName);
      setView('home');
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating workspace:', error);
      setError('Failed to create workspace. Please try again.');
      setIsCreating(false);
    }
  };

  const handleJoinWorkspace = async () => {
    if (!inputWorkspaceId.trim()) {
      setError('Please enter a workspace name');
      return;
    }

    const sanitizedId = sanitizeWorkspaceName(inputWorkspaceId);
    
    try {
      const doc = await db.collection('workspaces').doc(sanitizedId).get();
      if (doc.exists) {
        setWorkspaceId(sanitizedId);
        localStorage.setItem('workspaceId', sanitizedId);
        setView('home');
        setError('');
      } else {
        setError('Workspace not found. Please check the name and try again.');
      }
    } catch (error) {
      console.error('Error joining workspace:', error);
      setError('Failed to join workspace. Please try again.');
    }
  };

  const handleLeaveWorkspace = () => {
    if (confirm('Are you sure you want to leave this workspace? You can rejoin using the workspace name.')) {
      setWorkspaceId('');
      localStorage.removeItem('workspaceId');
      setView('setup');
      setExperiments([]);
      setToteBoxes(DEFAULT_TOTES); // Ensure a full reset
    }
  };

  // NEW FEATURE: Clear database
  const handleClearDatabase = async () => {
      // Confirmation 1: Backup
      const confirmBackup = confirm('WARNING: You are about to clear ALL data (experiments and totes) from your current workspace. Would you like to export a CSV backup before proceeding?');
      
      if (confirmBackup) {
          handleExportCSV();
      }
      
      // Confirmation 2: Final Clear
      const confirmClear = confirm('Are you absolutely sure you want to clear ALL experiments and totes for this workspace? This action is irreversible.');

      if (confirmClear) {
          setIsLoading(true); // Show loading spinner while deleting
          try {
              const expRef = db.collection('workspaces').doc(workspaceId).collection('experiments');
              const totesRef = db.collection('workspaces').doc(workspaceId).collection('totes');

              // Delete all experiments
              await deleteCollection(expRef);
              // Delete all dynamic totes
              await deleteCollection(totesRef);

              // Reset state and view
              setExperiments([]);
              setToteBoxes(DEFAULT_TOTES);
              setView('home');
              alert(`Successfully cleared all data from workspace: ${workspaceId}`);
          } catch (error) {
              console.error('Error clearing database:', error);
              setError('Failed to clear database. Please try again.');
          } finally {
              setIsLoading(false);
          }
      }
  };


  // MODIFIED: Logic to handle adding a new experiment, including new tote creation and confirmation.
  const handleAddExperiment = async (confirmed = false) => {
    let finalToteId = newExperiment.toteId;

    if (toteInputMode === 'new') {
        finalToteId = newToteId.trim();
    }
    
    if (!newExperiment.name.trim() || !finalToteId) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    
    // Check for existing tote error only for the "Add new tote" input field before final submission
    if (toteInputMode === 'new' && toteBoxes.includes(finalToteId) && !confirmed) {
         setError(`Error: Tote ID "${finalToteId}" already exists. Please select it from the dropdown or enter a new unique ID.`);
         return;
    }
    
    // Check if new tote is being added AND it's a *new* tote ID
    if (toteInputMode === 'new' && !toteBoxes.includes(finalToteId)) {
        if (!confirmed) {
            // Trigger confirmation dialog for new tote
            setShowConfirmation(true);
            return;
        }

        // New tote is confirmed and needs creation
        try {
            await db.collection('workspaces')
                .doc(workspaceId)
                .collection('totes')
                .doc(finalToteId)
                .set({ createdAt: firebase.firestore.FieldValue.serverTimestamp() });
            console.log(`New tote ${finalToteId} created successfully.`);
        } catch (error) {
            console.error('Error creating new tote:', error);
            // Non-fatal error, continue adding experiment
        }
    }
    
    // Add experiment
    try {
      await db.collection('workspaces')
        .doc(workspaceId)
        .collection('experiments')
        .add({
          name: newExperiment.name.trim(),
          toteId: finalToteId,
          dateAdded: firebase.firestore.FieldValue.serverTimestamp()
        });

      // Reset state and show success
      setNewExperiment({ name: '', toteId: '' });
      setNewToteId('');
      setToteInputMode('select');
      setShowConfirmation(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setView('home');
      }, 1500);
    } catch (error) {
      console.error('Error adding experiment:', error);
      setError('Failed to add experiment. Please try again.');
    }
  };
  
  // Confirmation handler
  const handleConfirmAddExperiment = (isConfirmed) => {
      setShowConfirmation(false);
      if (isConfirmed) {
          handleAddExperiment(true); // Pass true to skip confirmation and existing tote check
      }
  };

  const handleExportCSV = () => {
    if (experiments.length === 0) {
      alert('No experiments to export');
      return;
    }

    const headers = ['Experiment Name', 'Tote Box ID', 'Date Added'];
    const rows = experiments.map(exp => [
      exp.name,
      exp.toteId,
      exp.dateAdded ? new Date(exp.dateAdded.toDate()).toLocaleDateString() : 'N/A'
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seed-inventory-backup-${workspaceId}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportCSV = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target.result;
        const lines = text.split('\n').slice(1);
        
        const batch = db.batch();
        let experimentCount = 0;
        let toteIdsToAdd = new Set();
        const existingTotes = new Set(toteBoxes);

        lines.filter(line => line.trim()).forEach(line => {
          // Corrected split for CSV with quoted names
          const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(s => s.replace(/"/g, '').trim());
          const [name, toteId] = parts;

          if (name && toteId) {
            // 1. Add tote ID to a set for batch creation if it's new
            if (!existingTotes.has(toteId) && !DEFAULT_TOTES.includes(toteId) && toteId.length > 0) {
                toteIdsToAdd.add(toteId);
            }
            
            // 2. Prepare experiment for batch addition (This is what causes duplicates if re-imported)
            const ref = db.collection('workspaces')
              .doc(workspaceId)
              .collection('experiments')
              .doc();
            batch.set(ref, {
              name,
              toteId,
              dateAdded: firebase.firestore.FieldValue.serverTimestamp()
            });
            experimentCount++;
          }
        });

        // 3. Add new totes to the batch (handles new/existing dynamic totes correctly)
        toteIdsToAdd.forEach(toteId => {
            const toteRef = db.collection('workspaces')
                .doc(workspaceId)
                .collection('totes')
                .doc(toteId);
            // Use set with merge: true to avoid overwriting if a doc with the same ID already exists (though it shouldn't here)
            batch.set(toteRef, { createdAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
        });

        await batch.commit();
        alert(`Successfully imported ${experimentCount} experiments. Added ${toteIdsToAdd.size} new tote IDs.`);
      } catch (error) {
        console.error('Error importing CSV:', error);
        alert('Error importing CSV. Please check the file format and ensure no values contain commas without quotes.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const filteredExperiments = experiments.filter(exp =>
    exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.toteId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center' },
      React.createElement('div', { className: 'text-center' },
        React.createElement(Package, { className: 'w-16 h-16 text-green-600 mx-auto mb-4 animate-pulse' }),
        React.createElement('p', { className: 'text-gray-600' }, 'Loading...')
      )
    );
  }

  // Setup view (No changes)
  if (view === 'setup') {
    return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4' },
      React.createElement('div', { className: 'max-w-md w-full' },
        React.createElement('div', { className: 'text-center mb-8' },
          React.createElement(Package, { className: 'w-20 h-20 text-green-600 mx-auto mb-4' }),
          React.createElement('h1', { className: 'text-3xl font-bold text-gray-800 mb-2' }, 'Seed Inventory'),
          React.createElement('p', { className: 'text-gray-600' }, 'Create a workspace or join an existing one')
        ),

        error && React.createElement('div', { className: 'bg-red-50 border border-red-200 rounded-lg p-4 mb-6' },
          React.createElement('p', { className: 'text-red-800 text-sm' }, error)
        ),

        React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-6 mb-4' },
          React.createElement('div', { className: 'flex items-center gap-3 mb-4' },
            React.createElement(Plus, { className: 'w-6 h-6 text-green-600' }),
            React.createElement('h2', { className: 'text-xl font-bold text-gray-800' }, 'Create New Workspace')
          ),
          React.createElement('p', { className: 'text-gray-600 text-sm mb-4' }, 
            'Choose a unique name for your workspace'
          ),
          React.createElement('input', {
            type: 'text',
            value: newWorkspaceName,
            onChange: (e) => setNewWorkspaceName(e.target.value),
            onKeyPress: (e) => e.key === 'Enter' && handleCreateWorkspace(),
            placeholder: 'e.g., Omega Lab Inventory',
            className: 'w-full px-4 py-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-green-500 focus:border-transparent'
          }),
          newWorkspaceName && React.createElement('p', { className: 'text-xs text-gray-500 mb-4' },
            `Workspace ID: ${sanitizeWorkspaceName(newWorkspaceName) || '(invalid)'}`
          ),
          React.createElement('button', {
            onClick: handleCreateWorkspace,
            disabled: isCreating,
            className: `w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`
          }, isCreating ? 'Creating...' : 'Create Workspace')
        ),

        React.createElement('div', { className: 'bg-white rounded-xl shadow-lg p-6' },
          React.createElement('div', { className: 'flex items-center gap-3 mb-4' },
            React.createElement(Key, { className: 'w-6 h-6 text-blue-600' }),
            React.createElement('h2', { className: 'text-xl font-bold text-gray-800' }, 'Join Existing Workspace')
          ),
          React.createElement('p', { className: 'text-gray-600 text-sm mb-4' }, 
            'Enter the workspace name shared by your team'
          ),
          React.createElement('input', {
            type: 'text',
            value: inputWorkspaceId,
            onChange: (e) => setInputWorkspaceId(e.target.value),
            onKeyPress: (e) => e.key === 'Enter' && handleJoinWorkspace(),
            placeholder: 'e.g., omega-lab-inventory',
            className: 'w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          }),
          React.createElement('button', {
            onClick: handleJoinWorkspace,
            className: 'w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition'
          }, 'Join Workspace')
        )
      )
    );
  }

  // Main app view
  return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-20' },
    React.createElement('div', { className: 'bg-white shadow-md sticky top-0 z-10' },
      React.createElement('div', { className: 'max-w-4xl mx-auto px-4 py-4' },
        React.createElement('div', { className: 'flex items-center justify-between' },
          React.createElement('div', { className: 'flex items-center gap-3' },
            React.createElement(Package, { className: 'w-8 h-8 text-green-600' }),
            React.createElement('div', null,
              React.createElement('h1', { className: 'text-2xl font-bold text-gray-800' }, 'Seed Inventory'),
              React.createElement('p', { className: 'text-xs text-gray-500' }, `Workspace: ${workspaceId}`)
            )
          ),
          React.createElement('div', { className: 'flex gap-2' },
            React.createElement('button', {
              onClick: handleExportCSV,
              className: 'p-2 text-green-600 hover:bg-green-50 rounded-lg transition',
              title: 'Export CSV'
            }, React.createElement(Download, { className: 'w-5 h-5' })),
            React.createElement('label', {
              className: 'p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer',
              title: 'Import CSV',
              onClick: (e) => {
                // Ensure the click handler is not on the input itself
                if (!e.target.matches('input') && e.target.tagName !== 'INPUT') { 
                  setShowImportHelp(true);
                }
              }
            },
              React.createElement(Upload, { className: 'w-5 h-5' }),
              React.createElement('input', {
                type: 'file',
                accept: '.csv',
                onChange: handleImportCSV,
                className: 'hidden',
                onClick: (e) => e.stopPropagation()
              })
            ),
            // NEW: Settings Button
            React.createElement('button', {
              onClick: () => setView('settings'),
              className: 'p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition',
              title: 'Settings'
            }, React.createElement(Settings, { className: 'w-5 h-5' })),

            React.createElement('button', {
              onClick: handleLeaveWorkspace,
              className: 'p-2 text-red-600 hover:bg-red-50 rounded-lg transition',
              title: 'Leave Workspace'
            }, React.createElement(LogOut, { className: 'w-5 h-5' }))
          )
        )
      )
    ),

    React.createElement('div', { className: 'max-w-4xl mx-auto px-4 py-6' },
      showImportHelp && React.createElement('div', {
        className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4',
        onClick: () => setShowImportHelp(false)
      },
        React.createElement('div', {
          className: 'bg-white rounded-xl p-6 max-w-md w-full shadow-xl',
          onClick: (e) => e.stopPropagation()
        },
          React.createElement('h3', { className: 'text-xl font-bold mb-4 text-gray-800' }, 'CSV Import Format'),
          React.createElement('p', { className: 'text-gray-600 mb-4' }, 'Your CSV file should have these columns:'),
          React.createElement('div', { className: 'bg-gray-50 p-4 rounded-lg mb-4 font-mono text-sm' },
            'Experiment Name,Tote Box ID,Date Added',
            React.createElement('br'),
            '"Winter Wheat 2025",TB-S001,10/29/2024',
            React.createElement('br'),
            '"Corn Hybrid Test",TB-A20,10/28/2024'
          ),
          React.createElement('p', { className: 'text-sm text-gray-500 mb-4' }, 'Note: Date Added column is optional.'),
          React.createElement('button', {
            onClick: () => setShowImportHelp(false),
            className: 'w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
          }, 'Got it!')
        )
      ),
      
      // Confirmation Dialog
      showConfirmation && React.createElement('div', {
        className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4',
        onClick: () => handleConfirmAddExperiment(false) 
      },
        React.createElement('div', {
          className: 'bg-white rounded-xl p-6 max-w-sm w-full shadow-xl',
          onClick: (e) => e.stopPropagation()
        },
          React.createElement('h3', { className: 'text-xl font-bold mb-4 text-gray-800' }, 'Confirm New Tote'),
          React.createElement('p', { className: 'text-gray-600 mb-6' }, 
            `Are you sure you want to add experiment "${newExperiment.name.trim()}" and create the new Tote Box ID: **${newToteId.trim()}**?`
          ),
          React.createElement('div', { className: 'flex gap-3 justify-end' },
            React.createElement('button', {
              onClick: () => handleConfirmAddExperiment(false),
              className: 'px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition'
            }, 'No'),
            React.createElement('button', {
              onClick: () => handleConfirmAddExperiment(true),
              className: 'px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold'
            }, 'Yes')
          )
        )
      ),

      view === 'home' && React.createElement('div', { className: 'space-y-6' },
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' },
          React.createElement('button', {
            onClick: () => setView('add'),
            className: 'bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition flex items-center gap-4 group'
          },
            React.createElement('div', { className: 'bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition' },
              React.createElement(Plus, { className: 'w-8 h-8 text-green-600' })
            ),
            React.createElement('div', { className: 'text-left' },
              React.createElement('h3', { className: 'font-bold text-lg text-gray-800' }, 'Add Experiment'),
              React.createElement('p', { className: 'text-gray-600 text-sm' }, 'Record new seed storage')
            )
          ),

          React.createElement('button', {
            onClick: () => setView('search'),
            className: 'bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition flex items-center gap-4 group'
          },
            React.createElement('div', { className: 'bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition' },
              React.createElement(Search, { className: 'w-8 h-8 text-blue-600' })
            ),
            React.createElement('div', { className: 'text-left' },
              React.createElement('h3', { className: 'font-bold text-lg text-gray-800' }, 'Search Experiments'),
              React.createElement('p', { className: 'text-gray-600 text-sm' }, 'Find experiment locations')
            )
          )
        ),

        React.createElement('div', { className: 'bg-white rounded-xl p-6 shadow-md' },
          React.createElement('h3', { className: 'font-bold text-lg mb-4 text-gray-800' }, 'Inventory Overview'),
          React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
            React.createElement('div', { className: 'bg-green-50 rounded-lg p-4' },
              React.createElement('p', { className: 'text-gray-600 text-sm' }, 'Total Experiments'),
              React.createElement('p', { className: 'text-3xl font-bold text-green-600' }, experiments.length)
            ),
            React.createElement('div', { className: 'bg-blue-50 rounded-lg p-4' },
              React.createElement('p', { className: 'text-gray-600 text-sm' }, 'Tote Boxes'),
              React.createElement('p', { className: 'text-3xl font-bold text-blue-600' }, toteBoxes.length)
            )
          )
        )
      ),

      // 'add' view
      view === 'add' && React.createElement('div', { className: 'space-y-6' },
        React.createElement('button', {
          onClick: () => {
            setView('home');
            setError(''); // Clear error on back
            setToteInputMode('select'); // Reset mode
            setNewToteId(''); // Reset new tote id
            setNewExperiment({ name: '', toteId: '' }); // Reset experiment data
          },
          className: 'flex items-center gap-2 text-gray-600 hover:text-gray-800'
        },
          React.createElement(X, { className: 'w-5 h-5' }),
          React.createElement('span', null, 'Cancel')
        ),

        React.createElement('div', { className: 'bg-white rounded-xl p-6 shadow-md' },
          React.createElement('h2', { className: 'text-2xl font-bold mb-6 text-gray-800' }, 'Add New Experiment'),
          
          showSuccess && React.createElement('div', { className: 'mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3' },
            React.createElement(CheckCircle, { className: 'w-6 h-6 text-green-600' }),
            React.createElement('span', { className: 'text-green-800 font-medium' }, 'Experiment added successfully!')
          ),

          error && React.createElement('div', { className: 'mb-6 bg-red-50 border border-red-200 rounded-lg p-4' },
            React.createElement('p', { className: 'text-red-800 text-sm' }, error),
            // Back option for the error: tote already exist
            error.startsWith('Error: Tote ID') && React.createElement('button', {
                onClick: () => setError(''),
                className: 'mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium'
            }, 'Back')
          ),

          React.createElement('div', { className: 'space-y-4' },
            React.createElement('div', null,
              React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' },'Experiment Name'),
              React.createElement('input', {
                type: 'text',
                value: newExperiment.name,
                onChange: (e) => setNewExperiment({ ...newExperiment, name: e.target.value }),
                placeholder: 'e.g., Winter Wheat Trial 2025',
                className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
              })
            ),

            React.createElement('div', null,
              React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Tote Box ID'),
              
              // Option toggle buttons
              React.createElement('div', { className: 'flex mb-3 space-x-2' },
                  React.createElement('button', {
                      onClick: () => { setToteInputMode('select'); setError(''); setNewToteId(''); },
                      className: `flex-1 px-4 py-2 text-sm rounded-lg border transition ${toteInputMode === 'select' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`
                  }, 'Select Existing Tote'),
                  React.createElement('button', {
                      onClick: () => { setToteInputMode('new'); setError(''); setNewExperiment({ ...newExperiment, toteId: '' }); },
                      className: `flex-1 px-4 py-2 text-sm rounded-lg border transition ${toteInputMode === 'new' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`
                  }, 'Add New Tote')
              ),
              
              // Select Existing Tote dropdown
              toteInputMode === 'select' && React.createElement('select', {
                value: newExperiment.toteId,
                onChange: (e) => setNewExperiment({ ...newExperiment, toteId: e.target.value }),
                className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
              },
                React.createElement('option', { value: '' }, 'Select a tote box...'),
                toteBoxes.map(tote =>
                  React.createElement('option', { key: tote, value: tote }, tote)
                )
              ),
              
              // Add New Tote input
              toteInputMode === 'new' && React.createElement('input', {
                type: 'text',
                value: newToteId,
                onChange: (e) => setNewToteId(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '')), // Basic validation
                placeholder: 'e.g., TB-250045',
                className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
              })
            ),

            React.createElement('button', {
              onClick: handleAddExperiment,
              className: 'w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mt-6'
            }, 'Add Experiment')
          )
        )
      ),

      // 'search' view
      view === 'search' && React.createElement('div', { className: 'space-y-6' },
        React.createElement('button', {
          onClick: () => setView('home'),
          className: 'flex items-center gap-2 text-gray-600 hover:text-gray-800'
        },
          React.createElement(X, { className: 'w-5 h-5' }),
          React.createElement('span', null, 'Back')
        ),

        React.createElement('div', { className: 'bg-white rounded-xl p-6 shadow-md' },
          React.createElement('h2', { className: 'text-2xl font-bold mb-4 text-gray-800' }, 'Search Experiments'),
          
          React.createElement('div', { className: 'relative' },
            React.createElement(Search, { className: 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' }),
            React.createElement('input', {
              type: 'text',
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              placeholder: 'Search by name or tote ID...',
              className: 'w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            })
          )
        ),

        React.createElement('div', { className: 'space-y-3' },
          filteredExperiments.length === 0 ?
            React.createElement('div', { className: 'bg-white rounded-xl p-8 shadow-md text-center text-gray-500' },
              searchQuery ? 'No experiments found' : 'No experiments in inventory'
            ) :
            filteredExperiments.map(exp =>
              React.createElement('div', { key: exp.id, className: 'bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition' },
                React.createElement('div', { className: 'flex justify-between items-start' },
                  React.createElement('div', { className: 'flex-1' },
                    React.createElement('h3', { className: 'font-bold text-lg text-gray-800 mb-1' }, exp.name),
                    React.createElement('div', { className: 'flex items-center gap-2 text-sm text-gray-600' },
                      React.createElement(Package, { className: 'w-4 h-4' }),
                      React.createElement('span', { className: 'font-medium' }, exp.toteId)
                    )
                  ),
                  React.createElement('div', { className: 'text-xs text-gray-500 text-right' },
                    'Added',
                    React.createElement('br'),
                    exp.dateAdded ? new Date(exp.dateAdded.toDate()).toLocaleDateString() : 'N/A'
                  )
                )
              )
            )
        )
      ),

      // NEW FEATURE: Settings View
      view === 'settings' && React.createElement('div', { className: 'space-y-6' },
        React.createElement('button', {
          onClick: () => setView('home'),
          className: 'flex items-center gap-2 text-gray-600 hover:text-gray-800'
        },
          React.createElement(X, { className: 'w-5 h-5' }),
          React.createElement('span', null, 'Back to Home')
        ),

        React.createElement('div', { className: 'bg-white rounded-xl p-6 shadow-md' },
          React.createElement('h2', { className: 'text-2xl font-bold mb-4 text-gray-800' }, 'Workspace Settings'),
          
          error && React.createElement('div', { className: 'mb-6 bg-red-50 border border-red-200 rounded-lg p-4' },
              React.createElement('p', { className: 'text-red-800 text-sm' }, error)
          ),

          React.createElement('div', { className: 'p-4 border border-red-200 bg-red-50 rounded-lg' },
            React.createElement('h3', { className: 'text-xl font-bold text-red-800 mb-3' }, 'Danger Zone: Clear Database'),
            React.createElement('p', { className: 'text-gray-700 text-sm mb-4' },
              'This action will permanently delete ALL experiments and ALL custom tote IDs in the **',
              React.createElement('span', { className: 'font-semibold' }, workspaceId),
              '** workspace. This cannot be undone.'
            ),
            React.createElement('button', {
              onClick: handleClearDatabase,
              disabled: isLoading,
              className: `w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`
            }, isLoading ? 'Clearing Data...' : 'Clear All Database Data')
          )
        )
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(SeedInventoryApp));
