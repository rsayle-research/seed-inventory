const { useState, useEffect } = React;

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

const Users = ({ className }) => React.createElement('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' })
);

const Key = ({ className }) => React.createElement('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' })
);

const LogOut = ({ className }) => React.createElement('svg', { className, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
  React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2, d: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' })
);

function SeedInventoryApp() {
  const [view, setView] = useState('setup');
  const [workspaceId, setWorkspaceId] = useState('');
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [inputWorkspaceId, setInputWorkspaceId] = useState('');
  const [experiments, setExperiments] = useState([]);
  const [toteBoxes, setToteBoxes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newExperiment, setNewExperiment] = useState({ name: '', toteId: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showImportHelp, setShowImportHelp] = useState(false);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Check for existing workspace on load
  useEffect(() => {
    const savedWorkspaceId = localStorage.getItem('workspaceId');
    if (savedWorkspaceId) {
      setWorkspaceId(savedWorkspaceId);
      setView('home');
    }
    setIsLoading(false);
  }, []);

  // Load tote boxes from file
  useEffect(() => {
    fetch('totes.json')
      .then(res => res.json())
      .then(data => setToteBoxes(data.totes || data))
      .catch(() => {
        const defaultTotes = ['TB-001', 'TB-002', 'TB-003', 'TB-004', 'TB-005'];
        setToteBoxes(defaultTotes);
      });
  }, []);

  // Real-time listener for experiments
  useEffect(() => {
    if (!workspaceId) return;

    const unsubscribe = db.collection('workspaces')
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

    return () => unsubscribe();
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
    }
  };

  const handleAddExperiment = async () => {
    if (!newExperiment.name.trim() || !newExperiment.toteId) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await db.collection('workspaces')
        .doc(workspaceId)
        .collection('experiments')
        .add({
          name: newExperiment.name.trim(),
          toteId: newExperiment.toteId,
          dateAdded: firebase.firestore.FieldValue.serverTimestamp()
        });

      setNewExperiment({ name: '', toteId: '' });
      setShowSuccess(true);
      setError('');
      setTimeout(() => {
        setShowSuccess(false);
        setView('home');
      }, 1500);
    } catch (error) {
      console.error('Error adding experiment:', error);
      setError('Failed to add experiment. Please try again.');
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
    a.download = `seed-inventory-${workspaceId}-${new Date().toISOString().split('T')[0]}.csv`;
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
        let count = 0;

        lines.filter(line => line.trim()).forEach(line => {
          const [name, toteId] = line.split(',').map(s => s.replace(/"/g, '').trim());
          if (name && toteId) {
            const ref = db.collection('workspaces')
              .doc(workspaceId)
              .collection('experiments')
              .doc();
            batch.set(ref, {
              name,
              toteId,
              dateAdded: firebase.firestore.FieldValue.serverTimestamp()
            });
            count++;
          }
        });

        await batch.commit();
        alert(`Successfully imported ${count} experiments`);
      } catch (error) {
        console.error('Error importing CSV:', error);
        alert('Error importing CSV. Please check the file format.');
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

  // Setup view
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
                if (!e.target.matches('input')) {
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
            '"Winter Wheat 2025",TB-001,10/29/2024',
            React.createElement('br'),
            '"Corn Hybrid Test",TB-003,10/28/2024'
          ),
          React.createElement('p', { className: 'text-sm text-gray-500 mb-4' }, 'Note: Date Added column is optional.'),
          React.createElement('button', {
            onClick: () => setShowImportHelp(false),
            className: 'w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
          }, 'Got it!')
        )
      ),

      view === 'home' && React.createElement('div', { className: 'space-y-6' },
        React.createElement('div', { className: 'bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg' },
          React.createElement('div', { className: 'flex items-center gap-4 mb-4' },
            React.createElement(Camera, { className: 'w-8 h-8' }),
            React.createElement('div', null,
              React.createElement('h2', { className: 'text-xl font-bold' }, 'QR Code Scanner'),
              React.createElement('p', { className: 'text-green-100 text-sm' }, 'Scan to quickly access inventory')
            )
          ),
          React.createElement('p', { className: 'text-sm text-green-50' },
            'Generate QR codes that link to: https://rsayle-research.github.io/seed-inventory'
          )
        ),

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

      view === 'add' && React.createElement('div', { className: 'space-y-6' },
        React.createElement('button', {
          onClick: () => setView('home'),
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
            React.createElement('p', { className: 'text-red-800 text-sm' }, error)
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
              React.createElement('select', {
                value: newExperiment.toteId,
                onChange: (e) => setNewExperiment({ ...newExperiment, toteId: e.target.value }),
                className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
              },
                React.createElement('option', { value: '' }, 'Select a tote box...'),
                toteBoxes.map(tote =>
                  React.createElement('option', { key: tote, value: tote }, tote)
                )
              )
            ),

            React.createElement('button', {
              onClick: handleAddExperiment,
              className: 'w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mt-6'
            }, 'Add Experiment')
          )
        )
      ),

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
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(SeedInventoryApp));
