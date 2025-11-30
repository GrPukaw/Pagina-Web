const express = require('express');
const router = express.Router();
const Curso = require('../models/Curso');

// Obtener todos los cursos (público)
router.get('/', async (req, res) => {
try {
    const { category, level, search } = req.query;
    
    let query = { isActive: true };
    
    // Filtrar por categoría
    if (category && category !== '') {
    query.category = category;
    }
    
    // Filtrar por nivel
    if (level && level !== '') {
    query.level = level;
    }
    
    // Búsqueda por texto
    if (search) {
    query.$text = { $search: search };
    }
    
    const cursos = await Curso.find(query)
    .sort({ createdAt: -1 });
    
    res.json({
    success: true,
    count: cursos.length,
    cursos
    });
} catch (error) {
    console.error('Error al obtener cursos:', error);
    res.status(500).json({ 
    success: false,
    message: 'Error al obtener cursos' 
    });
}
});

// Obtener un curso por slug (público)
router.get('/:slug', async (req, res) => {
try {
    const curso = await Curso.findOne({ 
    slug: req.params.slug,
    isActive: true 
    });
    
    if (!curso) {
    return res.status(404).json({ 
        success: false,
        message: 'Curso no encontrado' 
    });
    }
    
    res.json({
    success: true,
    curso
    });
} catch (error) {
    console.error('Error al obtener curso:', error);
    res.status(500).json({ 
    success: false,
    message: 'Error al obtener curso' 
    });
}
});

// Crear curso (protegido - solo admin)
router.post('/', async (req, res) => {
try {
    const curso = new Curso(req.body);
    await curso.save();
    
    res.status(201).json({
    success: true,
    message: 'Curso creado exitosamente',
    curso
    });
} catch (error) {
    console.error('Error al crear curso:', error);
    res.status(500).json({ 
    success: false,
    message: 'Error al crear curso',
    error: error.message 
    });
}
});

// Actualizar curso (protegido - solo admin)
router.put('/:id', async (req, res) => {
try {
    const curso = await Curso.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    { new: true, runValidators: true }
    );
    
    if (!curso) {
    return res.status(404).json({ 
        success: false,
        message: 'Curso no encontrado' 
    });
    }
    
    res.json({
    success: true,
    message: 'Curso actualizado exitosamente',
    curso
    });
} catch (error) {
    console.error('Error al actualizar curso:', error);
    res.status(500).json({ 
    success: false,
    message: 'Error al actualizar curso' 
    });
}
});

// Eliminar curso (protegido - solo admin)
router.delete('/:id', async (req, res) => {
try {
    const curso = await Curso.findByIdAndDelete(req.params.id);
    
    if (!curso) {
    return res.status(404).json({ 
        success: false,
        message: 'Curso no encontrado' 
    });
    }
    
    res.json({
    success: true,
    message: 'Curso eliminado exitosamente'
    });
} catch (error) {
    console.error('Error al eliminar curso:', error);
    res.status(500).json({ 
    success: false,
    message: 'Error al eliminar curso' 
    });
}
});

module.exports = router;