const { useState, useEffect } = React;

// Simple icon components to replace Lucide
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

function SeedInventoryApp() {
  const [view, setView] = useState('home');
  const [experiments, setExperiments] = useState([]);
  const [toteBoxes, setToteBoxes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newExperiment, setNewExperiment] = useState({ name: '', toteId: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showImportHelp, setShowImportHelp] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load experiments from localStorage
      const storedExperiments = localStorage.getItem('seed_experiments');
      if (storedExperiments) {
        setExperiments(JSON.parse(storedExperiments));
      }
      
      // Load tote boxes from totes.json file
      try {
        const response = await fetch('totes.json');
        if (response.ok) {
          const data = await response.json();
          setToteBoxes(data.totes || data);
        } else {
          throw new Error('Failed to load totes.json');
        }
      } catch (toteError) {
        console.error('Error loading totes.json:', toteError);
        // Fallback to default totes if file doesn't exist
        const defaultTotes = [
          'TB-001', 'TB-002', 'TB-003', 'TB-004', 'TB-005',
          'TB-006', 'TB-007', 'TB-008', 'TB-009', 'TB-010'
        ];
        setToteBoxes(defaultTotes);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setIsLoading(false);
  };

  const saveExperiments = (updatedExperiments) => {
    try {
      localStorage.setItem('seed_experiments', JSON.stringify(updatedExperiments));
      setExperiments(updatedExperiments);
    } catch (error) {
      console.error('Error saving experiments:', error);
      alert('Failed to save experiment. Please try again.');
    }
  };

  const handleAddExperiment = () => {
    if (!newExperiment.name.trim() || !newExperiment.toteId) {
      alert('Please fill in all fields');
      return;
    }

    const experiment = {
      id: Date.now().toString(),
      name: newExperiment.name.trim(),
      toteId: newExperiment.toteId,
      dateAdded: new Date().toISOString()
    };

    const updated = [...experiments, experiment];
    saveExperiments(updated);
    
    setNewExperiment({ name: '', toteId: '' });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setView('home');
    }, 1500);
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
      new Date(exp.dateAdded).toLocaleDateString()
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seed-inventory-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const lines = text.split('\n').slice(1);
        const imported = lines
          .filter(line => line.trim())
          .map(line => {
            const [name, toteId] = line.split(',').map(s => s.replace(/"/g, '').trim());
            return {
              id: Date.now().toString() + Math.random(),
              name,
              toteId,
              dateAdded: new Date().toISOString()
            };
          });

        const updated = [...experiments, ...imported];
        saveExperiments(updated);
        alert(`Successfully imported ${imported.length} experiments`);
      } catch (error) {
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
        React.createElement('p', { className: 'text-gray-600' }, 'Loading inventory...')
      )
    );
  }

  return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-20' },
    React.createElement('div', { className: 'bg-white shadow-md sticky top-0 z-10' },
      React.createElement('div', { className: 'max-w-4xl mx-auto px-4 py-4' },
        React.createElement('div', { className: 'flex items-center justify-between' },
          React.createElement('div', { className: 'flex items-center gap-3' },
            React.createElement(Package, { className: 'w-8 h-8 text-green-600' }),
            React.createElement('h1', { className: 'text-2xl font-bold text-gray-800' }, 'Seed Inventory')
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
            )
          )
        )
      )
    ),

    React.createElement('div', { className: 'max-w-4xl mx-auto px-4 py-6' },
      // Import Help Modal
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
          React.createElement('p', { className: 'text-sm text-gray-500 mb-4' }, 'Note: Date Added column is optional and will auto-generate if missing.'),
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

          React.createElement('div', { className: 'space-y-4' },
            React.createElement('div', null,
              React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Experiment Name'),
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
                    new Date(exp.dateAdded).toLocaleDateString()
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
